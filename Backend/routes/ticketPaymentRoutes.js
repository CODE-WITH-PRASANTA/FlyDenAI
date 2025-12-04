const express = require("express");
const router = express.Router();
const controller = require("../controllers/ticketPaymentController");

router.post("/order/create", controller.createTicketOrder);
router.get("/order/verify", controller.verifyTicketPayment);

// webhook endpoint
router.post("/webhook", express.json({ type: "*/*" }), controller.ticketWebhook);

module.exports = router;
