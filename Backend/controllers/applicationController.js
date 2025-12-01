const VisaApplication = require("../models/VisaApplication");
const { generateApplicationId } = require("../middleware/generateId");
const fs = require("fs");
const path = require("path");

const transporter = require("../emails/emailTransporter");
const applicationEmailTemplate = require("../emails/templates/applicationEmail");
const paymentSuccessEmail = require("../emails/templates/paymentSuccessEmail");
const visaApprovedEmailTemplate = require("../emails/templates/visaApprovedEmail");



exports.createApplication = async (req, res) => {
  try {
    const applicationId = generateApplicationId();

    const app = await VisaApplication.create({
      applicationId,
      visaType: req.body.visaType,
      onwardDate: req.body.onwardDate,
      returnDate: req.body.returnDate,
      travellersCount: req.body.travellersCount,
      travellers: [],
      stepCompleted: 1
    });

    res.json({
      success: true,
      message: "Application ID generated successfully!",
      data: app,
    });
const transporter = require("../emails/emailTransporter");
const applicationEmailTemplate = require("../emails/templates/applicationEmail");

exports.saveTravellers = async (req, res) => {
  try {
    const app = await VisaApplication.findOne({ applicationId: req.params.id });
    if (!app) return res.status(404).json({ success: false, msg: "Not found" });

    // Parse travellers JSON
    const travellersArray = JSON.parse(req.body.travellers);

    const updatedTravellers = travellersArray.map((t, i) => {
      const passportFile = req.files.find(file => file.fieldname === `passportCopy_${i}`);
      const photoFile = req.files.find(file => file.fieldname === `photo_${i}`);

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
            : null,

          photo: photoFile
            ? {
                fieldname: photoFile.fieldname,
                filename: photoFile.filename,
                path: photoFile.path,
                url: `/uploads/${photoFile.filename}`,
                size: photoFile.size,
                mimeType: photoFile.mimetype,
              }
            : null,
        },
      };
    });

    app.travellers = updatedTravellers;
    app.stepCompleted = 2;
    await app.save();

    // -----------------------------
    // SEND EMAIL AFTER STEP 2 DONE
    // -----------------------------
    for (const traveller of updatedTravellers) {
      if (!traveller.email || traveller.email.trim() === "") continue;
      await transporter.sendMail({
        from: `"FlyDenAi Visa Team" <${process.env.EMAIL_USER}>`,
        to: traveller.email,
        subject: `Application Submitted – Your FlyDenAi Application ID: ${app.applicationId}`,
        html: applicationEmailTemplate(
          traveller.firstName,
          app.applicationId,
          app.visaType,
          app.onwardDate,
          app.returnDate,
          updatedTravellers
        ),
      });
    }

    res.json({ success: true, data: app });

  } catch (error) {
    console.log("Traveller Upload Error:", error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: err.message });
  }
};

exports.saveTravellers = async (req, res) => {
  try {
    const app = await VisaApplication.findOne({ applicationId: req.params.id });
    if (!app) return res.status(404).json({ success: false, msg: "Not found" });

    // Parse travellers JSON
    const travellersArray = JSON.parse(req.body.travellers);

    const updatedTravellers = travellersArray.map((t, i) => {
      const passportFile = req.files.find(file => file.fieldname === `passportCopy_${i}`);
      const photoFile = req.files.find(file => file.fieldname === `photo_${i}`);

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
            : null,

          photo: photoFile
            ? {
                fieldname: photoFile.fieldname,
                filename: photoFile.filename,
                path: photoFile.path,
                url: `/uploads/${photoFile.filename}`,
                size: photoFile.size,
                mimeType: photoFile.mimetype,
              }
            : null,
        },
      };
    });

    app.travellers = updatedTravellers;
    app.stepCompleted = 2;
    await app.save();

    // -----------------------------
    // SEND EMAIL AFTER STEP 2 DONE
    // -----------------------------
    for (const traveller of updatedTravellers) {
      if (!traveller.email || traveller.email.trim() === "") continue;
      await transporter.sendMail({
        from: `"FlyDenAi Visa Team" <${process.env.EMAIL_USER}>`,
        to: traveller.email,
        subject: `Application Submitted – Your FlyDenAi Application ID: ${app.applicationId}`,
        html: applicationEmailTemplate(
          traveller.firstName,
          app.applicationId,
          app.visaType,
          app.onwardDate,
          app.returnDate,
          updatedTravellers
        ),
      });
    }

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

    // Send Payment Success Email to all travellers with email
    for (const traveller of app.travellers) {
      if (!traveller.email || traveller.email.trim() === "") continue;

      await transporter.sendMail({
        from: `"FlyDenAi Visa Team" <${process.env.EMAIL_USER}>`,
        to: traveller.email,
        subject: `Payment Successful – FlyDenAi Visa Application ${app.applicationId}`,
        html: paymentSuccessEmail(
          traveller.firstName,
          app.applicationId,
          app.visaType,
          app.totalAmount
        )
      });
    }

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
      app.stepCompleted = 4;
      app.paymentStatus = "SUCCESS";

      await app.save();

      // -----------------------------
      // SEND VISA APPROVED EMAIL
      // -----------------------------
      for (const traveller of app.travellers) {
        if (!traveller.email || traveller.email.trim() === "") continue;

        await transporter.sendMail({
          from: `"FlyDenAi Visa Team" <${process.env.EMAIL_USER}>`,
          to: traveller.email,
          subject: `🎉 Visa Approved – FlyDenAi Application ${app.applicationId}`,
          html: visaApprovedEmailTemplate(
            traveller.firstName,
            app.applicationId,
            app.visaType
          ),
        });
      }

      return res.json({
        success: true,
        msg: "Application Approved Successfully & Email Sent",
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

exports.getApplicationStatus = async (req, res) => {
  try {
    const app = await VisaApplication.findOne(
      { applicationId: req.params.id },
      {
        applicationId: 1,
        stepCompleted: 1,
        paymentStatus: 1,
        approved: 1,
        approvedAt: 1,
        travellers: 1,
        globalFiles: 1,
        createdAt: 1,
      }
    );

    if (!app) {
      return res.status(404).json({
        success: false,
        message: "Invalid Application ID",
      });
    }

    // ⭐ If documents approved (step 4), automatically approve visa too
    if (app.stepCompleted >= 4 && !app.approved) {
      app.approved = true;
      app.approvedAt = new Date();
      await app.save();
    }

    const steps = [
      { id: 1, name: "Application Created" },
      { id: 2, name: "Documents Submitted" },
      { id: 3, name: "Payment Verified" },
      { id: 4, name: "Documents Approved" },
      { id: 5, name: "Visa Approved" },
    ];

    // ⭐ Final status logic
    let finalStatus = app.approved ? "APPROVED"
                     : app.stepCompleted >= 3 ? "UNDER REVIEW"
                     : "IN PROGRESS";

    // ⭐ If approved automatically, stepCompleted = 5
    const finalStep = app.approved ? 5 : app.stepCompleted;

    res.json({
      success: true,
      applicationId: app.applicationId,
      email: app.travellers?.[0]?.contactNumber || "N/A",
      stepCompleted: finalStep,
      paymentStatus: app.paymentStatus,
      approved: app.approved,
      approvedAt: app.approvedAt,
      visaStatus: finalStatus,
      steps,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
