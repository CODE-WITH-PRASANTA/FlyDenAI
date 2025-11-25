// routes/applicationRoutes.js
const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");

// import your multer utils
const { upload, convertToWebp } = require("../middleware/upload");

/**
 * Create application record (no files)
 * POST /api/applications
 */
router.post("/", applicationController.createApplication);

/**
 * Upload files for an existing application
 * Use upload.fields(...) so we can accept many named fields.
 *
 * Important: ensure the field names match what frontend sends:
 * traveller_{index}_passportCopy, traveller_{index}_photo
 * global_passportCopy, global_photo, travelItinerary, additionalDocument
 */
const fileFields = [
  // dynamic traveller fields: we can't enumerate infinite travellers here,
  // but multer will still accept unknown fields if not restricted. To
  // be safe we declare a few likely fields; you can also call upload.any()
  // but then you'll lose fieldname grouping - so we explicitly define common names:
  { name: "global_passportCopy", maxCount: 1 },
  { name: "global_photo", maxCount: 1 },
  { name: "travelItinerary", maxCount: 1 },
  { name: "additionalDocument", maxCount: 1 },

  // declare e.g. up to 8 travellers (adjust as needed)
  { name: "traveller_0_passportCopy", maxCount: 1 },
  { name: "traveller_0_photo", maxCount: 1 },
  { name: "traveller_1_passportCopy", maxCount: 1 },
  { name: "traveller_1_photo", maxCount: 1 },
  { name: "traveller_2_passportCopy", maxCount: 1 },
  { name: "traveller_2_photo", maxCount: 1 },
  { name: "traveller_3_passportCopy", maxCount: 1 },
  { name: "traveller_3_photo", maxCount: 1 },
  // extend if you support more travellers...
];

router.post(
  "/:id/upload",
  upload.fields(fileFields),
  convertToWebp,
  applicationController.uploadFiles
);

/**
 * Update payment information (called by frontend after verification or by your webhook)
 * PUT /api/applications/:id/payment
 */
router.put("/:id/payment", applicationController.updatePayment);

/**
 * Get application
 * GET /api/applications/:id
 */
router.get("/:id", applicationController.getApplication);

module.exports = router;
