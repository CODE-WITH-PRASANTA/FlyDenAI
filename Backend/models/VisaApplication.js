// models/VisaApplication.js
const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  fieldname: String,
  originalName: String,
  filename: String,
  path: String,
  url: String, // e.g. /uploads/xxx.webp
});

const TravellerSchema = new mongoose.Schema({
  title: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  dob: { type: String },
  nationality: { type: String },
  passportNo: { type: String },
  contactNumber: { type: String },
  // store files related to this traveller (passportCopy, photo)
  files: {
    passportCopy: { type: FileSchema, default: null },
    photo: { type: FileSchema, default: null },
  },
});

const PaymentSchema = new mongoose.Schema({
  amount: { type: Number, default: 0 }, // in rupees
  currency: { type: String, default: "INR" },
  merchantOrderId: { type: String }, // your generated order id
  transactionId: { type: String }, // payment provider txn id
  status: { type: String, enum: ["PENDING", "SUCCESS", "FAILED"], default: "PENDING" },
  rawResponse: { type: Object }, // store phonepe raw response if desired
  updatedAt: { type: Date },
});

const VisaApplicationSchema = new mongoose.Schema(
  {
    // reference to which visa listing (frontend passed id)
    visaId: { type: String, required: true },
    visaType: { type: String },

    // traveler count & details
    travellersCount: { type: Number, default: 1 },
    travellers: { type: [TravellerSchema], default: [] },

    // itinerary / dates
    onwardDate: { type: String },
    returnDate: { type: String },

    // global documents uploaded at step 4
    globalDocs: {
      passportCopy: { type: FileSchema, default: null },
      photo: { type: FileSchema, default: null },
      travelItinerary: { type: FileSchema, default: null },
      additionalDocument: { type: FileSchema, default: null },
    },

    // coupon / discounts
    couponCode: { type: String },
    discountPercent: { type: Number, default: 0 },

    // pricing & breakdown
    baseFare: { type: Number, default: 0 },
    taxAmount: { type: Number, default: 0 },
    serviceCharge: { type: Number, default: 0 },
    discountAmount: { type: Number, default: 0 },
    totalPayable: { type: Number, default: 0 },

    // payment block
    payment: { type: PaymentSchema },

    // application state: INITIATED -> PAYMENT_PENDING -> DOCUMENTS_UPLOADED -> COMPLETED
    status: {
      type: String,
      enum: ["INITIATED", "PAYMENT_PENDING", "DOCUMENTS_UPLOADED", "COMPLETED", "CANCELLED"],
      default: "INITIATED",
    },

    // metadata
    createdByIp: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { strict: false }
);

// update updatedAt
VisaApplicationSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("VisaApplication", VisaApplicationSchema);
