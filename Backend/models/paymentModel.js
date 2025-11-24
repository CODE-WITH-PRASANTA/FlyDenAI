const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    gatewayOrderId: { type: String },
    amount: { type: Number, required: true },

    status: {
      type: String,
      enum: [
        "CREATED",
        "PENDING",
        "COMPLETED",
        "FAILED",
        "REFUNDED",
        "CANCELLED",
      ],
      default: "CREATED",
    },

    gatewayInitialState: { type: String },
    gatewayStatusResponse: { type: Object },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
