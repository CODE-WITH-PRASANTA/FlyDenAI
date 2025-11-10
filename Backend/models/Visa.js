const mongoose = require("mongoose");

const visaTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  processingTime: String,
  stayPeriod: String,
  validity: String,
  category: String,
  entryType: String,
  fees: String,
});

const faqSchema = new mongoose.Schema({
  q: { type: String, required: true },
  a: { type: String, required: true },
});

const infoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const visaSchema = new mongoose.Schema(
  {
    country: { type: String, required: true },
    bannerUrl: { type: String },
    specialImageUrl: { type: String },
    processingTime: { type: String, required: true },
    startingPrice: { type: String, required: true },
    approvalTagline: { type: String, required: true },
    isPopular: { type: Boolean, default: false },
    isNormal: { type: Boolean, default: true },
    visaTypes: [visaTypeSchema],
    documents: [String],
    faqs: [faqSchema],
    infos: [infoSchema],
    description: { type: String, required: true },
    expert: { type: String },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Visa", visaSchema);
