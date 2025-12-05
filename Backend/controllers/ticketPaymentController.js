const axios = require("axios");
const qs = require("querystring");
const TicketPayment = require("../models/TicketPayment");

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
  const expiresAt = data.expires_at || now + (data.expires_in || 3600);

  tokenCache = { token: accessToken, expiresAt };

  return accessToken;
}

exports.createTicketOrder = async (req, res) => {
  try {
    const {
      amount,
      finalAmount,
      discountAmount,
      couponCode,
      bookingData,
      customer,
    } = req.body;

    if (!finalAmount) {
      return res.status(400).json({ success: false, message: "Final amount required" });
    }

    const amountPaisa = Math.round(finalAmount * 100);
    const merchantOrderId = `TICKET-${Date.now()}`;

    const token = await getPhonePeAuthToken();

    // 🔥 Your FRONTEND routes
    const successUrl = `${FRONTEND_URL}/dummyticket/success/${merchantOrderId}`;
    const failureUrl = `${FRONTEND_URL}/dummyticket/booking/${merchantOrderId}`;

    const payload = {
      merchantOrderId,
      amount: amountPaisa,
      expireAfter: 900,
      metaInfo: {
        udf1: JSON.stringify({
  bookingData: bookingData || {},
  customer: customer || {}
}),

      },
      paymentFlow: {
        type: "PG_CHECKOUT",
        merchantUrls: {
          redirectUrl: successUrl,    // USER RETURNS HERE AFTER SUCCESS
          failureUrl: failureUrl,     // IF FAILED
          cancelUrl: failureUrl,      // IF CANCELLED
        },
      },
    };

    const createRes = await axios.post(CREATE_PAYMENT_URL, payload, {
      headers: {
        Authorization: `O-Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // save order to DB
    await TicketPayment.create({
      orderId: merchantOrderId,
      amount,
      finalAmount,
      discountAmount,
      couponCode,
      customer,
      bookingData,
      gatewayInitialState: createRes.data.state,
    });

    return res.json({
      success: true,
      redirectUrl: createRes.data.redirectUrl,
      merchantOrderId,
    });
  } catch (err) {
    console.error("Create Ticket Order Error:", err.response?.data || err);
    return res.status(500).json({
      success: false,
      message: "Failed to create Ticket Order",
      error: err.response?.data || err,
    });
  }
};

function normalizeState(rawState) {
  if (!rawState) return "PENDING";

  const s = rawState.toUpperCase();
  if (["COMPLETED", "SUCCESS", "CHARGED", "CAPTURED"].includes(s)) return "SUCCESS";
  if (["PENDING", "CREATED", "INITIATED"].includes(s)) return "PENDING";
  return "FAILED";
}

exports.verifyTicketPayment = async (req, res) => {
  try {
    const { orderId } = req.query;

    if (!orderId)
      return res.status(400).json({ success: false, message: "orderId required" });

    const token = await getPhonePeAuthToken();

    const url = `${ORDER_STATUS_URL}/${orderId}/status?details=false`;

    const statusRes = await axios.get(url, {
      headers: {
        Authorization: `O-Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const rawState =
      statusRes.data?.state || statusRes.data?.data?.state || "PENDING";

    const paymentStatus = normalizeState(rawState);

    // update DB
    await TicketPayment.findOneAndUpdate(
      { orderId },
      {
        status: paymentStatus,
        gatewayStatusResponse: statusRes.data,
      }
    );

    return res.json({
      success: true,
      paymentStatus,
      rawState,
      data: statusRes.data,
    });
  } catch (err) {
    console.error("Verify Ticket Payment Error:", err.response?.data || err);
    return res.status(500).json({
      success: false,
      message: "Failed to verify Ticket Payment",
      error: err.response?.data || err,
    });
  }
};

exports.ticketWebhook = async (req, res) => {
  try {
    console.log("PhonePe Webhook Hit:", req.body);

    // TODO: validate signature

    const orderId =
      req.body?.merchantOrderId ||
      req.body?.data?.merchantOrderId ||
      null;

    if (!orderId) return res.status(400).send({ success: false });

    const rawState =
      req.body?.state || req.body?.data?.state || "PENDING";

    const paymentStatus = normalizeState(rawState);

    await TicketPayment.findOneAndUpdate(
      { orderId },
      {
        status: paymentStatus,
        gatewayStatusResponse: req.body,
      }
    );

    res.status(200).send({ success: true });
  } catch (err) {
    console.error("Webhook Error:", err);
    res.status(500).send({ success: false });
  }
};
 