// controllers/visaApplicationController.js
const VisaApplication = require("../models/VisaApplication");

// helper: generate application id FlyDenAi-YYYY-xxxxx
function generateApplicationId() {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `FlyDenAi-${year}-${random}`;
}

// helper to build file metadata from multer file object
function buildFileMeta(file) {
  if (!file) return null;
  return {
    fieldname: file.fieldname,
    originalName: file.originalname,
    filename: file.filename,
    path: file.path,
    url: `/uploads/${file.filename}`,
    size: file.size || 0,
    mimeType: file.mimetype || "",
  };
}

// Create new application (partial session start)
exports.createApplication = async (req, res) => {
  try {
    const { visaId, visaType, travellers = 1, meta = {} } = req.body;

    // generate unique id
    let applicationId = generateApplicationId();

    // ensure uniqueness (rare collision guard)
    let existing = await VisaApplication.findOne({ applicationId });
    while (existing) {
      applicationId = generateApplicationId();
      existing = await VisaApplication.findOne({ applicationId });
    }

    // create travellers skeleton
    const travCount = Math.max(1, parseInt(travellers, 10) || 1);
    const travellerArray = Array.from({ length: travCount }).map(() => ({
        title: "Mr",
        firstName: "",
        lastName: "",
        dob: "",
        nationality: "Indian",
        passportNo: "",
        contactNumber: "",
        files: {
          passportCopy: null,
          photo: null,
        },
      }));

    const app = new VisaApplication({
      applicationId,
      visaId: visaId || null,
      visaType: visaType || "",
      travellersCount: travCount,
      travellers: travellerArray,
      meta,
    });

    await app.save();

    return res.json({
  success: true,
  message: "Application created",
  data: {
    _id: app._id,
    applicationId: app.applicationId, // readable ID
  }
});
  } catch (err) {
    console.error("createApplication error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Partial update for step data (text fields)
exports.updateStep = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { step, data } = req.body; // data is arbitrary JSON for the step

    if (!applicationId) return res.status(400).json({ success: false, message: "Missing applicationId" });

    const app = await VisaApplication.findOne({ applicationId });
    if (!app) return res.status(404).json({ success: false, message: "Application not found" });

    // Example merge logic:
    // - If data contains travellers (array), merge traveller fields index-wise but do not remove file metadata
    if (data && Array.isArray(data.travellers)) {
      const incomingTravellers = data.travellers;
      for (let i = 0; i < incomingTravellers.length; i++) {
        const incoming = incomingTravellers[i] || {};
        // ensure slot exists
        if (!app.travellers[i]) {
            app.travellers[i] = {
              title: "Mr",
              firstName: "",
              lastName: "",
              dob: "",
              nationality: "Indian",
              passportNo: "",
              contactNumber: "",
              files: {
                passportCopy: null,
                photo: null,
              }
            };
          }

        // copy allowed scalar fields
        const fields = ["title", "firstName", "lastName", "dob", "nationality", "passportNo", "contactNumber"];
        fields.forEach((f) => {
          if (incoming[f] !== undefined) app.travellers[i][f] = incoming[f];
        });
        // do not overwrite files here
      }
      // update travellersCount if needed
      app.travellersCount = Math.max(app.travellersCount, incomingTravellers.length);
    }

    // if other fields are present at top-level, merge them safely
    const updatableTop = ["visaType", "currentStep", "meta", "visaId"];
    updatableTop.forEach((k) => {
      if (data && data[k] !== undefined) app[k] = data[k];
    });

    // optionally set currentStep to the provided step (if numeric)
    if (step && Number.isInteger(step)) app.currentStep = step;

    await app.save();
    return res.json({ success: true, data: app });
  } catch (err) {
    console.error("updateStep error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Upload files endpoint (works with multer upload.any() + convertToWebp)
exports.uploadFiles = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const app = await VisaApplication.findOne({ applicationId });
    if (!app) return res.status(404).json({ success: false, message: "Application not found" });

    // req.files is an array when using upload.any()
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    // Map files to their places
    for (const file of req.files) {
      const fname = file.fieldname; // e.g. traveller_0_passportCopy or global_passportCopy
      const meta = buildFileMeta(file);

      if (fname.startsWith("traveller_")) {
        // expected format: traveller_{index}_{key}
        const parts = fname.split("_"); // ["traveller","0","passportCopy"]
        if (parts.length >= 3) {
          const idx = parseInt(parts[1], 10);
          const key = parts.slice(2).join("_"); // passportCopy or photo etc
          if (!Number.isNaN(idx)) {
            if (!app.travellers[idx]) {
                app.travellers[idx] = {
                  title: "Mr",
                  firstName: "",
                  lastName: "",
                  dob: "",
                  nationality: "Indian",
                  passportNo: "",
                  contactNumber: "",
                  files: {
                    passportCopy: null,
                    photo: null,
                  }
                };
              }

            if (!app.travellers[idx].files) {
              app.travellers[idx].files = {
                passportCopy: null,
                photo: null,
              };
            }
            app.travellers[idx].files[key] = meta;

          }
        }
        continue;
      }

      if (fname.startsWith("global_")) {
        // global_passportCopy, global_photo, etc
        const key = fname.replace(/^global_/, "");
        app.globalDocs = app.globalDocs || {};
        app.globalDocs[key] = meta;
        continue;
      }

      // fallback: save into meta keyed by fieldname
      app.meta = app.meta || {};
      app.meta.files = app.meta.files || {};
      app.meta.files[fname] = meta;
    }

    await app.save();

    return res.json({ success: true, message: "Files uploaded", data: app });
  } catch (err) {
    console.error("uploadFiles error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Payment update (called by your payment webhook / redirect handler)
exports.updatePayment = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { merchantOrderId, status, transactionId, amount, rawResponse } = req.body;

    const app = await VisaApplication.findOne({ applicationId });
    if (!app) return res.status(404).json({ success: false, message: "Application not found" });

    app.payment = app.payment || {};
    if (merchantOrderId) app.payment.merchantOrderId = merchantOrderId;
    if (status) app.payment.status = status;
    if (transactionId) app.payment.transactionId = transactionId;
    if (amount) app.payment.amount = amount;
    if (rawResponse) app.payment.rawResponse = rawResponse;

    // Advance step to next logical stage on success
    if (status === "SUCCESS") {
      app.currentStep = Math.max(app.currentStep, 3); // example: payment step = 3
    }

    await app.save();
    return res.json({ success: true, data: app });
  } catch (err) {
    console.error("updatePayment error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const app = await VisaApplication.findOne({ applicationId });
    if (!app) return res.status(404).json({ success: false, message: "Application not found" });
    return res.json({ success: true, data: app });
  } catch (err) {
    console.error("getApplication error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
