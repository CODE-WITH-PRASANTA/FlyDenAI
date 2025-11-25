// controllers/applicationController.js
const VisaApplication = require("../models/VisaApplication");
const path = require("path");

// helper to build file metadata object
const buildFileObject = (file, req) => {
  if (!file) return null;
  const url = `/uploads/${file.filename}`; // served statically from server
  return {
    fieldname: file.fieldname,
    originalName: file.originalname,
    filename: file.filename,
    path: file.path,
    url,
  };
};

/**
 * POST /api/applications
 * Create a new application record from JSON payload (no files).
 * Frontend should create application before initiating payment.
 * Body expected: {
 *   visaId, visaType, travellersCount, travellers: [{title,firstName,...}], onwardDate, returnDate, pricing...
 * }
 */
exports.createApplication = async (req, res) => {
  try {
    const payload = req.body || {};
    // parse numeric fields if they arrive as strings
    if (payload.travellersCount) payload.travellersCount = Number(payload.travellersCount);

    const app = new VisaApplication({
      visaId: payload.visaId,
      visaType: payload.visaType,
      travellersCount: payload.travellersCount || (payload.travellers ? payload.travellers.length : 1),
      travellers: payload.travellers || [],
      onwardDate: payload.onwardDate,
      returnDate: payload.returnDate,
      couponCode: payload.couponCode,
      discountPercent: payload.discountPercent || 0,
      baseFare: payload.baseFare || 0,
      taxAmount: payload.taxAmount || 0,
      serviceCharge: payload.serviceCharge || 0,
      discountAmount: payload.discountAmount || 0,
      totalPayable: payload.totalPayable || 0,
      // payment will be updated later
      payment: {
        amount: payload.totalPayable || 0,
        status: "PENDING",
      },
      status: "PAYMENT_PENDING",
      createdByIp: req.ip,
    });

    await app.save();

    return res.json({ success: true, applicationId: app._id, data: app });
  } catch (err) {
    console.error("createApplication error:", err);
    return res.status(500).json({ success: false, message: "Failed to create application", error: err.message });
  }
};

/**
 * POST /api/applications/:id/upload
 * Accepts multipart/form-data for traveller files and global docs.
 *
 * Expectation:
 * - A text field 'data' containing JSON string with optional travellers metadata.
 * - Files named in this convention:
 *    traveller_0_passportCopy, traveller_0_photo,
 *    traveller_1_passportCopy, traveller_1_photo, ...
 *    global_passportCopy, global_photo, travelItinerary, additionalDocument
 *
 * The route will map uploaded files into the respective traveller/global slots.
 */
exports.uploadFiles = async (req, res) => {
  try {
    const { id } = req.params;
    const app = await VisaApplication.findById(id);
    if (!app) return res.status(404).json({ success: false, message: "Application not found" });

    // optional JSON data (e.g., updated traveller fields)
    let jsonData = {};
    if (req.body?.data) {
      try {
        jsonData = JSON.parse(req.body.data);
      } catch (e) {
        // ignore parse errors; we continue with files only
      }
    }

    // map req.files into application model
    // req.files is an object: { fieldname: [fileObj, ...], ... } (because upload.fields used)
    const filesObj = req.files || {};

    // helper to pick file by name
    const getFirstFile = (field) => {
      const arr = filesObj[field];
      return Array.isArray(arr) && arr.length > 0 ? arr[0] : null;
    };

    // update travellers files
    for (let i = 0; i < (app.travellers.length || 0); i++) {
      // if frontend sent updated traveller data in request.data, merge it
      if (jsonData.travellers && jsonData.travellers[i]) {
        app.travellers[i] = { ...app.travellers[i]._doc, ...jsonData.travellers[i] };
      }

      const passportFile = getFirstFile(`traveller_${i}_passportCopy`);
      const photoFile = getFirstFile(`traveller_${i}_photo`);

      if (passportFile) app.travellers[i].files.passportCopy = buildFileObject(passportFile, req);
      if (photoFile) app.travellers[i].files.photo = buildFileObject(photoFile, req);
    }

    // Global docs
    const g_passport = getFirstFile("global_passportCopy");
    const g_photo = getFirstFile("global_photo");
    const g_itinerary = getFirstFile("travelItinerary");
    const g_add = getFirstFile("additionalDocument");

    if (g_passport) app.globalDocs.passportCopy = buildFileObject(g_passport, req);
    if (g_photo) app.globalDocs.photo = buildFileObject(g_photo, req);
    if (g_itinerary) app.globalDocs.travelItinerary = buildFileObject(g_itinerary, req);
    if (g_add) app.globalDocs.additionalDocument = buildFileObject(g_add, req);

    // If frontend indicates documents uploaded, update status
    app.status = "DOCUMENTS_UPLOADED";
    await app.save();

    return res.json({ success: true, message: "Files uploaded and application updated", data: app });
  } catch (err) {
    console.error("uploadFiles error:", err);
    return res.status(500).json({ success: false, message: "Failed to upload files", error: err.message });
  }
};

/**
 * PUT /api/applications/:id/payment
 * Update payment details after successful payment (frontend or webhook can call)
 * body: { merchantOrderId, transactionId, status, rawResponse }
 */
exports.updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { merchantOrderId, transactionId, status, rawResponse } = req.body;

    const app = await VisaApplication.findById(id);
    if (!app) return res.status(404).json({ success: false, message: "Application not found" });

    app.payment = {
      ...app.payment,
      merchantOrderId: merchantOrderId || app.payment.merchantOrderId,
      transactionId: transactionId || app.payment.transactionId,
      status: status || app.payment.status,
      rawResponse: rawResponse || app.payment.rawResponse,
      updatedAt: new Date(),
    };

    // If payment success and docs already uploaded -> finalize
    if (app.payment.status === "SUCCESS") {
      // if docs already uploaded - mark completed, else PAYMENT_PENDING until docs uploaded
      app.status = app.status === "DOCUMENTS_UPLOADED" ? "COMPLETED" : "PAYMENT_PENDING";
    } else if (app.payment.status === "FAILED") {
      app.status = "CANCELLED";
    }

    await app.save();
    return res.json({ success: true, message: "Payment updated", data: app });
  } catch (err) {
    console.error("updatePayment error:", err);
    return res.status(500).json({ success: false, message: "Failed to update payment", error: err.message });
  }
};

/**
 * GET /api/applications/:id
 */
exports.getApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const app = await VisaApplication.findById(id);
    if (!app) return res.status(404).json({ success: false, message: "Application not found" });
    return res.json({ success: true, data: app });
  } catch (err) {
    console.error("getApplication error:", err);
    return res.status(500).json({ success: false, message: "Failed to fetch application", error: err.message });
  }
};
