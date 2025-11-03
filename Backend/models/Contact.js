const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    whatsapp: { type: String, default: "", trim: true },

    social: {
      instagram: { type: String, default: "" },
      facebook: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
    },

    openHours: {
      Sun: { type: String, default: "" },
      Mon: { type: String, default: "" },
      Tue: { type: String, default: "" },
      Wed: { type: String, default: "" },
      Thu: { type: String, default: "" },
      Fri: { type: String, default: "" },
      Sat: { type: String, default: "" },
    },

    addresses: [{ type: String, trim: true }],
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", ContactSchema);
