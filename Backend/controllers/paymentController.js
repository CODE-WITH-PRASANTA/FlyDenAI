// controllers/paymentController.js
const axios = require("axios");
const Payment = require("../models/paymentModel");

const CLIENT_ID = process.env.PHONEPE_CLIENT_ID;
const CLIENT_SECRET = process.env.PHONEPE_CLIENT_SECRET;
const CLIENT_VERSION = process.env.PHONEPE_CLIENT_VERSION || "1";

const OAUTH_URL = process.env.PHONEPE_OAUTH_URL;
const PAY_URL = process.env.PHONEPE_PAY_URL;
const STATUS_BASE_URL = process.env.PHONEPE_STATUS_BASE_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;

let cachedToken = null;
let tokenExpiry = 0;

// GET AUTH TOKEN
async function getAuthToken() {
  const now = Date.now();
  if (cachedToken && tokenExpiry && now < tokenExpiry - 60000) {
    return cachedToken;
  }

  const params = new URLSearchParams();
  params.append("client_id", CLIENT_ID);
  params.append("client_version", CLIENT_VERSION);
  params.append("client_secret", CLIENT_SECRET);
  params.append("grant_type", "client_credentials");

  const { data } = await axios.post(OAUTH_URL, params.toString(), {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  cachedToken = data.access_token;
  if (data.expires_at) tokenExpiry = data.expires_at * 1000;

  return cachedToken;
}

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { amount, visaId } = req.body;

    if (!amount || !visaId)
      return res.status(400).json({ success: false, message: "Amount & visaId required" });

    const merchantOrderId = "FD_" + Date.now();

    await Payment.create({
      orderId: merchantOrderId,
      amount,
      status: "CREATED",
    });

    const token = await getAuthToken();

   const redirectBackURL = `${FRONTEND_URL}/apply/now/${visaId}?orderId=${merchantOrderId}`;

      const payload = {
          merchantOrderId,
          amount: Math.round(amount * 100),
          paymentFlow: {
              type: "PG_CHECKOUT",
              redirectMode: "GET",  
              redirectUrl: redirectBackURL,
          }
      };



    const pgRes = await axios.post(PAY_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `O-Bearer ${token}`,
      },
    });

    const { orderId: phonepeOrderId, state, redirectUrl } = pgRes.data;

    await Payment.findOneAndUpdate(
      { orderId: merchantOrderId },
      {
        gatewayOrderId: phonepeOrderId,
        gatewayInitialState: state,
      }
    );

    res.status(200).json({
      success: true,
      orderId: merchantOrderId,
      redirectUrl,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to initiate payment",
      error: error.message,
    });
  }
};

// VERIFY PAYMENT
exports.verifyPayment = async (req, res) => {
  try {
    const { orderId } = req.query;

    if (!orderId)
      return res.status(400).json({ success: false, message: "orderId required" });

    const token = await getAuthToken();

    const statusUrl = `${STATUS_BASE_URL}/${orderId}/status?details=false`;

    const statusRes = await axios.get(statusUrl, {
      headers: {
        Authorization: `O-Bearer ${token}`,
      },
    });

    const status = statusRes.data.state || "FAILED";

    const updated = await Payment.findOneAndUpdate(
      { orderId },
      {
        status,
        gatewayStatusResponse: statusRes.data,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      orderId,
      status,
      payment: updated,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Could not verify payment",
    });
  }
};
