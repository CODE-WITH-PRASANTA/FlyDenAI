const mongoose = require("mongoose");

const passengerSchema = new mongoose.Schema({
  title: String,
  firstName: String,
  lastName: String,
  nationality: String,
});

const ticketBookingSchema = new mongoose.Schema(
  {
    customer: {
      name: String,
      email: String,
      phone: String,
      purpose: String
    },

    passengers: [passengerSchema],

    bookingData: {
      title: String,
      from: String,
      to: String,
      date: String,
      returnDate: String,
      travellers: Number,
      class: String,
      tripType: String,
    },

    priceDetails: {
      baseAmount: Number,
      discountAmount: Number,
      finalAmount: Number,
      couponCode: String,
      isCouponApplied: Boolean
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },

    approveStatus: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING"
    },

    paymentInfo: {
      transactionId: { type: String, default: null },
      providerReferenceId: { type: String, default: null },
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("TicketBooking", ticketBookingSchema);
