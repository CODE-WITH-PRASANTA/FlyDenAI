const VisaApplication = require("../models/VisaApplication");

// helper to build file metadata
const buildFileObject = (file) => {
  if (!file) return null;
  return {
    fieldname: file.fieldname,
    originalName: file.originalname,
    filename: file.filename,
    path: file.path,
    url: `/uploads/${file.filename}`,
  };
};

/**
 * Create application before payment
 */
exports.createApplication = async (req, res) => {
  try {
    const payload = req.body;

    const app = new VisaApplication({
      applicationId: undefined, // triggers auto-generate
      visaId: payload.visaId,
      visaType: payload.visaType,
      travellersCount: payload.travellersCount,
      travellers: payload.travellers,
      onwardDate: payload.onwardDate,
      returnDate: payload.returnDate,
      couponCode: payload.couponCode,
      discountPercent: payload.discountPercent,
      baseFare: payload.baseFare,
      taxAmount: payload.taxAmount,
      serviceCharge: payload.serviceCharge,
      discountAmount: payload.discountAmount,
      totalPayable: payload.totalPayable,

      payment: {
        amount: payload.totalPayable,
        status: "PENDING",
      },

      status: "PAYMENT_PENDING",
      createdByIp: req.ip,
    });

    await app.save();

    return res.json({
      success: true,
      applicationId: app.applicationId,
      data: app,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Upload Docs
 */
// Upload Docs

exports.uploadFiles = async (req, res) => {
  try {
    const { id } = req.params;

    const app = await VisaApplication.findOne({ applicationId: id });
    if (!app) return res.status(404).json({ success: false, message: "Application not found" });

    let jsonData = {};
    if (req.body.data) {
      try {
        jsonData = JSON.parse(req.body.data);
      } catch {}
    }

    const files = req.files || {};

    const get = (f) => (files[f] && files[f][0] ? files[f][0] : null);

    // FIXED: Safe update for travellers
    for (let i = 0; i < app.travellers.length; i++) {

      // safely merge traveller data (not replacing object)
      if (jsonData.travellers && jsonData.travellers[i]) {
        Object.assign(app.travellers[i], jsonData.travellers[i]);
      }

      // ensure files object exists
      if (!app.travellers[i].files) {
        app.travellers[i].files = {};
      }

      const pass = get(`traveller_${i}_passportCopy`);
      const photo = get(`traveller_${i}_photo`);

      if (pass) app.travellers[i].files.passportCopy = buildFileObject(pass);
      if (photo) app.travellers[i].files.photo = buildFileObject(photo);
    }

    // Global files
    if (!app.globalDocs) app.globalDocs = {};

    const globalFields = [
      "global_passportCopy",
      "global_photo",
      "travelItinerary",
      "additionalDocument",
    ];

    globalFields.forEach((field) => {
      const file = get(field);
      if (file) {
        app.globalDocs[field.replace("global_", "")] = buildFileObject(file);
      }
    });

    app.status = "DOCUMENTS_UPLOADED";
    await app.save();

    return res.json({ success: true, data: app });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Update Payment Status
 */
exports.updatePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const app = await VisaApplication.findOne({ applicationId: id });
    if (!app) return res.status(404).json({ success: false, message: "Application not found" });

    const { merchantOrderId, transactionId, status, rawResponse } = req.body;

    app.payment = {
      ...app.payment,
      merchantOrderId,
      transactionId,
      status,
      rawResponse,
      updatedAt: new Date(),
    };

    if (status === "SUCCESS") {
      app.status = app.status === "DOCUMENTS_UPLOADED" ? "COMPLETED" : "PAYMENT_PENDING";
    } else if (status === "FAILED") {
      app.status = "CANCELLED";
    }

    await app.save();
    return res.json({ success: true, data: app });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * Get Application
 */
exports.getApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const app = await VisaApplication.findOne({ applicationId: id });
    if (!app) return res.status(404).json({ success: false, message: "Application not found" });

    return res.json({ success: true, data: app });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
