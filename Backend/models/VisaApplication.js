const mongoose = require("mongoose");

// Generate readable application ID
function generateApplicationId() {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `FlyDen-${year}-${random}`;
}

const FileSchema = new mongoose.Schema({
  fieldname: String,
  originalName: String,
  filename: String,
  path: String,
  url: String,
});

const TravellerSchema = new mongoose.Schema({
  title: String,
  firstName: String,
  lastName: String,
  dob: String,
  nationality: String,
  passportNo: String,
  contactNumber: String,
  files: {
    passportCopy: { type: FileSchema, default: null },
    photo: { type: FileSchema, default: null },
  },
});

const PaymentSchema = new mongoose.Schema({
  amount: { type: Number, default: 0 },
  currency: { type: String, default: "INR" },
  merchantOrderId: String,
  transactionId: String,
  status: { type: String, enum: ["PENDING", "SUCCESS", "FAILED"], default: "PENDING" },
  rawResponse: Object,
  updatedAt: Date,
});

const VisaApplicationSchema = new mongoose.Schema(
  {
    applicationId: { type: String, unique: true, required: true }, // ⭐ Custom ID

    visaId: { type: String, required: true },
    visaType: String,

    travellersCount: Number,
    travellers: [TravellerSchema],

    onwardDate: String,
    returnDate: String,

    globalDocs: {
      passportCopy: FileSchema,
      photo: FileSchema,
      travelItinerary: FileSchema,
      additionalDocument: FileSchema,
    },

    couponCode: String,
    discountPercent: Number,

    baseFare: Number,
    taxAmount: Number,
    serviceCharge: Number,
    discountAmount: Number,
    totalPayable: Number,

    payment: PaymentSchema,

    status: {
      type: String,
      enum: ["INITIATED", "PAYMENT_PENDING", "DOCUMENTS_UPLOADED", "COMPLETED", "CANCELLED"],
      default: "INITIATED",
    },

    createdByIp: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { strict: false }
);

// Auto-generate readable application ID
VisaApplicationSchema.pre("validate", function (next) {
  if (!this.applicationId) {
    this.applicationId = generateApplicationId();
  }
  next();
});

// Auto update timestamp
VisaApplicationSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("VisaApplication", VisaApplicationSchema);
