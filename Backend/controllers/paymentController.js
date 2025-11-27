// controllers/paymentController.js
const axios = require("axios");
const qs = require("querystring");
const VisaApplication = require("../models/VisaApplication");


const {
  PHONEPE_CLIENT_ID,
  PHONEPE_CLIENT_SECRET,
  PHONEPE_CLIENT_VERSION = "1",
  PHONEPE_ENV = "sandbox",
  FRONTEND_URL,
} = process.env;

const isSandbox = PHONEPE_ENV === "sandbox";

const AUTH_URL = isSandbox
  ? "https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token"
  : "https://api.phonepe.com/apis/identity-manager/v1/oauth/token";

const CREATE_PAYMENT_URL = isSandbox
  ? "https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/pay"
  : "https://api.phonepe.com/apis/pg/checkout/v2/pay";

const ORDER_STATUS_URL = isSandbox
  ? "https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/order"
  : "https://api.phonepe.com/apis/pg/checkout/v2/order";

/**
 * Simple in-memory token cache. For production use a proper cache (Redis) and handle concurrency.
 */
let tokenCache = { token: null, expiresAt: 0 };

async function getPhonePeAuthToken() {
  const now = Date.now() / 1000;
  if (tokenCache.token && tokenCache.expiresAt - 30 > now) {
    return tokenCache.token;
  }

  const body = {
    client_id: PHONEPE_CLIENT_ID,
    client_version: PHONEPE_CLIENT_VERSION,
    client_secret: PHONEPE_CLIENT_SECRET,
    grant_type: "client_credentials",
  };

  const res = await axios.post(AUTH_URL, qs.stringify(body), {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const data = res.data;
  const accessToken = data.access_token;
  const expiresAt = data.expires_at || (Math.floor(Date.now() / 1000) + (data.expires_in || 3600));
  tokenCache = { token: accessToken, expiresAt };
  return accessToken;
}

/**
 * POST /payment/create-order
 * body: { amount: number (INR or rupees) , visaId?, meta? }
 * Returns: { success: true, redirectUrl, merchantOrderId }
 */
exports.createOrder = async (req, res) => {
  try {
    const { amount, meta = {} } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ success: false, message: "Invalid amount" });

    // PhonePe expects amount in paisa (i.e., rupees * 100)
    const amountPaisa = Math.round(Number(amount) * 100); // e.g. 100.50 -> 10050

    // generate unique merchantOrderId (keep <= 63 chars)
    const merchantOrderId = `VISA-${Date.now()}`;

    const token = await getPhonePeAuthToken();

    // redirectUrl: where PhonePe sends user back (include merchantOrderId so frontend can verify)
    const redirectUrl = `${FRONTEND_URL}/apply/now/${req.body.visaId}?merchantOrderId=${merchantOrderId}`;

    const payload = {
      merchantOrderId,
      amount: amountPaisa,
      expireAfter: 1200,
      metaInfo: {
        udf1: JSON.stringify(meta || {}),
      },
      paymentFlow: {
        type: "PG_CHECKOUT",
        merchantUrls: { redirectUrl },
      },
    };

    const createRes = await axios.post(CREATE_PAYMENT_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `O-Bearer ${token}`,
      },
      timeout: 15000,
    });

    // save order to DB as PENDING if you want (not implemented here)
    // e.g., save merchantOrderId, amount, meta, state: 'PENDING'

    const data = createRes.data;
    return res.json({
      success: true,
      orderId: data.orderId,
      state: data.state,
      redirectUrl: data.redirectUrl,
      merchantOrderId,
    });
  } catch (err) {
    console.error("createOrder error:", err.response?.data || err.message);
    return res.status(500).json({ success: false, message: "Failed to create order", error: err.response?.data || err.message });
  }
};

/**
 * Helper to normalize PhonePe states to a simple status
 */
function normalizePhonePeState(rawState) {
  if (!rawState) return "PENDING";

  const s = String(rawState).toUpperCase();

  // treat any of these as success
  const successStates = ["COMPLETED", "SUCCESS", "CHARGED", "CAPTURED", "SETTLED"];
  if (successStates.includes(s)) return "SUCCESS";

  // treat known pending-ish states as pending
  const pendingStates = ["PENDING", "INITIATED", "CREATED", "INPROGRESS"];
  if (pendingStates.includes(s)) return "PENDING";

  // otherwise treat as failed (DECLINED, FAILED, CANCELLED, EXPIRED, REFUNDED, etc.)
  return "FAILED";
}

/**
 * GET /payment/verify-payment?merchantOrderId=...
 * Calls PhonePe Order Status API and returns the state.
 * Returns { success: true, paymentStatus: "SUCCESS"|"FAILED"|"PENDING", data: <PhonePe raw response> }
 */
exports.verifyOrder = async (req, res) => {
  try {
    const { merchantOrderId, applicationId } = req.query;

    if (!merchantOrderId) {
      return res.status(400).json({ success: false, message: "merchantOrderId required" });
    }

    const token = await getPhonePeAuthToken();

    const url = `${ORDER_STATUS_URL}/${encodeURIComponent(
      merchantOrderId
    )}/status?details=false`;

    const statusRes = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `O-Bearer ${token}`,
      },
      timeout: 15000,
    });

    const data = statusRes.data;

    // RAW PhonePe state
    const rawState =
      data?.state || data?.data?.state || data?.orderStatus || null;

    const paymentStatus = normalizePhonePeState(rawState);

    // transactionId
    const transactionId =
      data?.transactionId ||
      data?.data?.transactionId ||
      data?.orderId ||
      merchantOrderId;

    // ⭐ IMPORTANT: UPDATE DATABASE
    if (applicationId) {
      await VisaApplication.findOneAndUpdate(
        { applicationId },
        {
          paymentStatus,
          transactionId,
          stepCompleted: paymentStatus === "SUCCESS" ? 3 : 2,
        }
      );
    }

    return res.json({
      success: true,
      paymentStatus,
      rawState,
      transactionId,
      data,
    });
  } catch (err) {
    console.error("verifyOrder error:", err.response?.data || err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to verify order",
      error: err.response?.data || err.message,
    });
  }
};



/**
 * POST /payment/webhook
 * PhonePe may call your webhook when order reaches terminal state.
 * Implement verification (X-VERIFY / X-MERCHANT-ID, etc.) per PhonePe docs if required.
 */
exports.webhookHandler = async (req, res) => {
  try {
    // phonepe will send a signed payload / headers. Validate as per your PhonePe onboarding docs.
    console.log("phonepe webhook payload:", req.headers, req.body);

    // TODO: verify signature here (X-VERIFY or similar)
    // update your DB with payment details

    res.status(200).send({ success: true });
  } catch (err) {
    console.error("webhook error", err);
    res.status(500).send({ success: false });
  }
};
