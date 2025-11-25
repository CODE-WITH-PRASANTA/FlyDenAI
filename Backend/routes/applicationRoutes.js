const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");
const { upload, convertToWebp } = require("../middleware/upload");

router.post("/", applicationController.createApplication);



router.post("/:id/upload", async (req, res, next) => {
  try {
    const app = await VisaApplication.findOne({ applicationId: req.params.id });
    if (!app) return res.status(404).json({ success: false, message: "Application not found" });

    const fields = [
      { name: "global_passportCopy", maxCount: 1 },
      { name: "global_photo", maxCount: 1 },
      { name: "travelItinerary", maxCount: 1 },
      { name: "additionalDocument", maxCount: 1 },
    ];

    for (let i = 0; i < app.travellers.length; i++) {
      fields.push({ name: `traveller_${i}_passportCopy`, maxCount: 1 });
      fields.push({ name: `traveller_${i}_photo`, maxCount: 1 });
    }

    upload.fields(fields)(req, res, next);

  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Upload config failed" });
  }
}, convertToWebp, applicationController.uploadFiles);

router.put("/:id/payment", applicationController.updatePayment);
router.get("/:id", applicationController.getApplication);

module.exports = router;
