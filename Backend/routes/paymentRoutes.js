// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.post("/create-order", paymentController.createOrder);
router.get("/verify-payment", paymentController.verifyOrder);

// webhook endpoint (register this URL in PhonePe dashboard or pass as X-CALLBACK-URL while creating order)
router.post("/webhook", express.json({ type: "*/*" }), paymentController.webhookHandler);

module.exports = router;
