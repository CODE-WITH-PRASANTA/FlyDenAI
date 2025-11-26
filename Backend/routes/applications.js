const express = require("express");
const router = express.Router();
const controller = require("../controllers/visaApplicationController");

// import your multer + convertToWebp middleware
const { upload, convertToWebp } = require("../middleware/upload");

// Create application
router.post("/create", controller.createApplication);

// partial save of step data (JSON)
router.put("/:applicationId/step", controller.updateStep);

router.post(
  "/:applicationId/upload",
  upload.any(),
  convertToWebp,
  controller.uploadFiles
);


// payment update
router.put("/:applicationId/payment", controller.updatePayment);

// get application
router.get("/:applicationId", controller.getApplication);

module.exports = router;
