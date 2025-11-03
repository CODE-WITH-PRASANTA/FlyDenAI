const mongoose = require("mongoose");

const visaTypeSchema = new mongoose.Schema({
  name: String,
  processingTime: String,
  stayPeriod: String,
  validity: String,
  category: String,
  entryType: String,
  fees: String,
});

const documentSchema = new mongoose.Schema({
  text: String,
});

const faqSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

const infoSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const visaSchema = new mongoose.Schema(
  {
    country: { type: String, required: true },
    processingTime: String,
    startingPrice: String,
    approvalTime: String,
    description: String,
    isPopular: { type: Boolean, default: false },
    isNormal: { type: Boolean, default: false },
    expert: { type: [String] },
    bannerUrl: { type: String },
    visaTypes: [visaTypeSchema],
    documents: [documentSchema],
    faqs: [faqSchema],
    infos: [infoSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Visa", visaSchema);
