const VisaApplication = require("../models/VisaApplication");
const { generateApplicationId } = require("../middleware/generateId");

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


