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

if (!CLIENT_ID || !CLIENT_SECRET || !OAUTH_URL || !PAY_URL || !STATUS_BASE_URL) {
  console.error("❌ PhonePe configuration missing in .env");
}

// Simple in-memory auth token cache (optional but better)
let cachedToken = null;
let tokenExpiry = 0; // epoch ms

async function getAuthToken() {
  const now = Date.now();
  if (cachedToken && tokenExpiry && now < tokenExpiry - 60_000) {
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
  // expires_at is epoch seconds, convert to ms
  if (data.expires_at) {
    tokenExpiry = data.expires_at * 1000;
  }

  return cachedToken;
}

// ===================== CREATE ORDER =====================
exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid amount" });
    }

    // merchantOrderId as per V2 docs
    const merchantOrderId = "FD_" + Date.now();

    // Save in DB as PENDING/CREATED
    await Payment.create({
      orderId: merchantOrderId,
      amount,
      status: "CREATED",
    });

    const token = await getAuthToken();

    const payload = {
      merchantOrderId,
      amount: Math.round(amount * 100), // in paisa
      paymentFlow: {
        type: "PG_CHECKOUT",
        merchantUrls: {
          // After payment, PhonePe will redirect the user here
          // We embed orderId in the URL so frontend can read it
          redirectUrl: `${FRONTEND_URL}/visa-form?orderId=${merchantOrderId}`,
        },
      },
    };

    const pgRes = await axios.post(PAY_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `O-Bearer ${token}`,
      },
    });

    const { orderId: phonepeOrderId, state, redirectUrl } = pgRes.data;

    // Update DB with gateway info
    await Payment.findOneAndUpdate(
      { orderId: merchantOrderId },
      {
        gatewayOrderId: phonepeOrderId,
        gatewayInitialState: state,
      }
    );

    return res.status(200).json({
      success: true,
      orderId: merchantOrderId,
      redirectUrl, // URL to redirect user to PhonePe checkout page
    });
  } catch (error) {
    console.error(
      "Create Order Error =>",
      error?.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to initiate payment",
      error: error.message,
    });
  }
};

// ===================== VERIFY PAYMENT (Order Status) =====================
exports.verifyPayment = async (req, res) => {
  try {
    const { orderId } = req.query;

    if (!orderId) {
      return res
        .status(400)
        .json({ success: false, message: "orderId is required" });
    }

    const token = await getAuthToken();

    const statusUrl = `${STATUS_BASE_URL}/${orderId}/status?details=false`;
    const statusRes = await axios.get(statusUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `O-Bearer ${token}`,
      },
    });

    const state = statusRes.data?.state || "FAILED";

    // Update DB
    const updatedPayment = await Payment.findOneAndUpdate(
      { orderId },
      {
        status: state,
        gatewayStatusResponse: statusRes.data,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      orderId,
      status: state, // COMPLETED / PENDING / FAILED
      payment: updatedPayment,
    });
  } catch (err) {
    console.error(
      "Verify Payment Error =>",
      err?.response?.data || err.message
    );
    return res.status(500).json({
      success: false,
      message: "Unable to verify payment",
    });
  }
};
