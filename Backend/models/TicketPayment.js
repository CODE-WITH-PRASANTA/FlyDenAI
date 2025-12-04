const mongoose = require("mongoose");

const ticketPaymentSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    gatewayOrderId: { type: String },

    amount: { type: Number, required: true }, // in INR

    status: {
      type: String,
      enum: ["CREATED", "PENDING", "SUCCESS", "FAILED"],
      default: "CREATED",
    },

    finalAmount: { type: Number }, 
    couponCode: { type: String },
    discountAmount: { type: Number },

    customer: {
      name: String,
      email: String,
      phone: String,
    },

    bookingData: { type: Object }, // flight/hotel sidebar data

    gatewayStatusResponse: { type: Object },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TicketPayment", ticketPaymentSchema);
