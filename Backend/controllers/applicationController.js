const VisaApplication = require("../models/VisaApplication");
const { generateApplicationId } = require("../middleware/generateId");

const fs = require("fs");
const path = require("path");


exports.createApplication = async (req, res) => {
  try {
    const applicationId = generateApplicationId();

    const app = await VisaApplication.create({
      applicationId,
      visaType: req.body.visaType,
      onwardDate: req.body.onwardDate,
      returnDate: req.body.returnDate,
      travellersCount: req.body.travellersCount,
      stepCompleted: 1
    });

    res.json({ success: true, data: app });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

exports.saveTravellers = async (req, res) => {
  try {
    const app = await VisaApplication.findOne({ applicationId: req.params.id });
    if (!app) return res.status(404).json({ success: false, msg: "Not found" });

    // travellers sent as JSON string → parse it
    const travellersArray = JSON.parse(req.body.travellers);

    const updatedTravellers = travellersArray.map((t, i) => {
      // find files from multer.any() array
      const passportFile = req.files.find(
        (file) => file.fieldname === `passportCopy_${i}`
      );
      const photoFile = req.files.find(
        (file) => file.fieldname === `photo_${i}`
      );

      return {
        ...t,
        files: {
          passportCopy: passportFile
            ? {
                fieldname: passportFile.fieldname,
                filename: passportFile.filename,
                path: passportFile.path,
                url: `/uploads/${passportFile.filename}`,
                size: passportFile.size,
                mimeType: passportFile.mimetype,
              }
            : app.travellers[i]?.files?.passportCopy || null,

          photo: photoFile
            ? {
                fieldname: photoFile.fieldname,
                filename: photoFile.filename,
                path: photoFile.path,
                url: `/uploads/${photoFile.filename}`,
                size: photoFile.size,
                mimeType: photoFile.mimetype,
              }
            : app.travellers[i]?.files?.photo || null,
        },
      };
    });

    app.travellers = updatedTravellers;
    app.stepCompleted = Math.max(app.stepCompleted, 2);
    await app.save();

    res.json({ success: true, data: app });
  } catch (error) {
    console.log("Traveller Upload Error:", error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

exports.savePaymentInfo = async (req, res) => {
  try {
    const app = await VisaApplication.findOne({ applicationId: req.params.id });

    app.totalAmount = req.body.totalAmount;
    app.stepCompleted = Math.max(app.stepCompleted, 3);
    await app.save();

    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, msg: err.message });
  }
};

exports.uploadGlobalDocs = async (req, res) => {
  try {
    const app = await VisaApplication.findOne({ applicationId: req.params.id });

   for (let key in req.files) {
  const file = req.files[key][0];
  app.globalFiles[key] = {
    fieldname: file.fieldname,
    filename: file.filename,
    path: file.path,
    url: `/uploads/${file.filename}`,
    size: file.size,
    mimeType: file.mimetype,
  };
  }



    app.stepCompleted = 4;
    await app.save();

    res.json({ success: true, data: app });
  } catch (e) {
    res.json({ success: false, msg: e.message });
  }
};

// 1. Get all applications
exports.getAllApplications = async (req, res) => {
  try {
    const apps = await VisaApplication.find().sort({ createdAt: -1 });
    res.json({ success: true, data: apps });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

// 2. Get single application by ID
exports.getApplicationById = async (req, res) => {
  try {
    const app = await VisaApplication.findOne({ applicationId: req.params.id });
    if (!app) return res.status(404).json({ success: false, msg: "Not found" });

    res.json({ success: true, data: app });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

// 3. Filter by payment status
exports.getByPaymentStatus = async (req, res) => {
  try {
    const apps = await VisaApplication.find({ paymentStatus: req.params.status.toUpperCase() });
    res.json({ success: true, data: apps });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

// 4. Get ONLY completed applications (step 4 done)
exports.getCompletedApplications = async (req, res) => {
  try {
    const apps = await VisaApplication.find({ stepCompleted: 4 });
    res.json({ success: true, data: apps });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

// 5. Get ONLY in-progress applications (< step 4)
exports.getInProgressApplications = async (req, res) => {
  try {
    const apps = await VisaApplication.find({ stepCompleted: { $lt: 4 } });
    res.json({ success: true, data: apps });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

// 6. Fetch only travellers data
exports.getTravellers = async (req, res) => {
  try {
    const app = await VisaApplication.findOne(
      { applicationId: req.params.id },
      { travellers: 1, _id: 0 }
    );
    res.json({ success: true, data: app.travellers });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

// 7. Fetch only global documents
exports.getGlobalDocs = async (req, res) => {
  try {
    const app = await VisaApplication.findOne(
      { applicationId: req.params.id },
      { globalFiles: 1, _id: 0 }
    );
    res.json({ success: true, data: app.globalFiles });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

// 8. Fetch only payment info
exports.getPaymentInfo = async (req, res) => {
  try {
    const app = await VisaApplication.findOne(
      { applicationId: req.params.id },
      { totalAmount: 1, paymentStatus: 1, stepCompleted: 1 }
    );
    res.json({ success: true, data: app });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};


exports.approveApplication = async (req, res) => {
  try {
    const app = await VisaApplication.findOne({ applicationId: req.params.id });

    if (!app)
      return res.status(404).json({ success: false, msg: "Application not found" });

    app.approved = true;
    app.approvedAt = new Date();
    app.stepCompleted = 4; // Final step
    app.paymentStatus = "SUCCESS"; // Optional but recommended

    await app.save();

    return res.json({
      success: true,
      msg: "Application Approved Successfully",
      data: app,
    });

  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const app = await VisaApplication.findOne({ applicationId: req.params.id });

    if (!app)
      return res.status(404).json({ success: false, msg: "Application not found" });

    // Utility function to delete a file
    const deleteFile = (fileObj) => {
      if (fileObj && fileObj.path) {
        const filePath = path.join(__dirname, "..", fileObj.path);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    };

    // Delete Traveller Files
    app.travellers.forEach((t) => {
      deleteFile(t.files?.passportCopy);
      deleteFile(t.files?.photo);
    });

    // Delete Global Documents
    deleteFile(app.globalFiles?.passportCopy);
    deleteFile(app.globalFiles?.photo);
    deleteFile(app.globalFiles?.travelItinerary);
    deleteFile(app.globalFiles?.additionalDocument);

    // Delete the DB document
    await VisaApplication.deleteOne({ applicationId: req.params.id });

    return res.json({
      success: true,
      msg: "Application deleted successfully",
    });

  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};
