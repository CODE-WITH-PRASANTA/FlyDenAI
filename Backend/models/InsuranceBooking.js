const mongoose = require("mongoose");

const InsuranceBookingSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    whatsapp: { type: String, required: true, trim: true },

    fromAirport: { type: Object, required: true },
    toAirport: { type: Object, required: true },

    insuranceStartDate: { type: String, required: true },
    insuranceEndDate: { type: String, required: true },

    travelPurpose: { type: String, required: true },

    bookingId: {
      type: String,
      required: true,
      unique: true,
    },

    // NEW FIELD FOR STATUS
    status: {
      type: String,
      enum: ["Pending", "Finalized"],
      default: "Pending",
    },

    // NEW UNIQUE FORMATTED INSURANCE ID
    insuranceCode: {
      type: String,
      required: true,
      unique: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("InsuranceBooking", InsuranceBookingSchema);
