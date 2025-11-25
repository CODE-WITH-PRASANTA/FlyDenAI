const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");
const { upload, convertToWebp } = require("../middleware/upload");

router.post("/", applicationController.createApplication);

const fileFields = [
  { name: "global_passportCopy", maxCount: 1 },
  { name: "global_photo", maxCount: 1 },
  { name: "travelItinerary", maxCount: 1 },
  { name: "additionalDocument", maxCount: 1 },
  { name: "traveller_0_passportCopy", maxCount: 1 },
  { name: "traveller_0_photo", maxCount: 1 },
  { name: "traveller_1_passportCopy", maxCount: 1 },
  { name: "traveller_1_photo", maxCount: 1 },
  { name: "traveller_2_passportCopy", maxCount: 1 },
  { name: "traveller_2_photo", maxCount: 1 },
  { name: "traveller_3_passportCopy", maxCount: 1 },
  { name: "traveller_3_photo", maxCount: 1 },
];

router.post("/:id/upload", upload.fields(fileFields), convertToWebp, applicationController.uploadFiles);
router.put("/:id/payment", applicationController.updatePayment);
router.get("/:id", applicationController.getApplication);

module.exports = router;
