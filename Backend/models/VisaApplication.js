const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  fieldname: String,
  filename: String,
  path: String,
  url: String,
  size: Number,
  mimeType: String,
}, { _id: false });

const TravellerSchema = new mongoose.Schema({
  title: String,
  firstName: String,
  lastName: String,
  dob: String,
  nationality: String,
  passportNo: String,
  contactNumber: String,
  files: {
    passportCopy: FileSchema,
    photo: FileSchema,
  }
});

const ApplicationSchema = new mongoose.Schema({
  applicationId: { type: String, unique: true },

  // Step 1
  visaType: String,
  onwardDate: String,
  returnDate: String,
  travellersCount: Number,

  // Step 2
  travellers: [TravellerSchema],

  // Step 3 Payment
  totalAmount: Number,
  paymentStatus: {
    type: String,
    enum: ["PENDING", "SUCCESS", "FAILED"],
    default: "PENDING",
  },

  // Step 4 - global files
  globalFiles: {
    ticket: FileSchema,
    hotel: FileSchema,
    others: FileSchema,
  },

  stepCompleted: {
    type: Number,
    default: 1,
  },

}, { timestamps: true });

module.exports = mongoose.model("VisaApplication", ApplicationSchema);
