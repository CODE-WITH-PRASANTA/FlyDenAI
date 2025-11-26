// models/VisaApplication.js
const mongoose = require("mongoose");

const FileMetaSchema = new mongoose.Schema(
  {
    fieldname: String,
    originalName: String,
    filename: String,
    path: String,
    url: String,
    size: Number,
    mimeType: String,
  },
  { _id: false }
);

const TravellerSchema = new mongoose.Schema({
  title: { type: String, default: "Mr" },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  dob: { type: String, default: "" },
  nationality: { type: String, default: "Indian" },
  passportNo: { type: String, default: "" },
  contactNumber: { type: String, default: "" },
  files: {
    passportCopy: { type: FileMetaSchema, default: null },
    photo: { type: FileMetaSchema, default: null },
  },
});

const VisaApplicationSchema = new mongoose.Schema(
  {
    applicationId: { type: String, required: true, unique: true },
    visaId: { type: mongoose.Schema.Types.ObjectId, ref: "Visa", required: false },
    visaType: { type: String, default: "" },
    travellersCount: { type: Number, default: 1 },
    travellers: { type: [TravellerSchema], default: [] },

    // global documents (if user uploads one file as common doc)
    globalDocs: {
      passportCopy: { type: FileMetaSchema, default: null },
      photo: { type: FileMetaSchema, default: null },
      travelItinerary: { type: FileMetaSchema, default: null },
      additionalDocument: { type: FileMetaSchema, default: null },
    },

    // step/flow tracking
    currentStep: { type: Number, default: 1 },

    // payment
    payment: {
      status: { type: String, enum: ["PENDING", "SUCCESS", "FAILED"], default: "PENDING" },
      amount: { type: Number, default: 0 },
      merchantOrderId: { type: String, default: "" },
      transactionId: { type: String, default: "" },
      rawResponse: { type: mongoose.Schema.Types.Mixed, default: null },
    },

    meta: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VisaApplication", VisaApplicationSchema);
