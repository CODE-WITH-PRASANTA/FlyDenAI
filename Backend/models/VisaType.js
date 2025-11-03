const mongoose = require("mongoose");

const consultantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  about: { type: String, required: true },
  imageUrl: { type: String }, // webp stored path or Cloudinary URL
});

const visaTypeSchema = new mongoose.Schema(
  {
    visaName: { type: String, required: true },
    visaDesc: { type: String, required: true },
    visaOverview: { type: String },
    visaProcess: { type: String },
    features: [{ type: String }],
    specialFeatures: [{ type: String }],
    visaImageUrl: { type: String },
    consultant: consultantSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("VisaType", visaTypeSchema);
