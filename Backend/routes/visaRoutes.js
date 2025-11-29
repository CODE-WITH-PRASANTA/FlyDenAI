const express = require("express");
const router = express.Router();
const { upload, convertToWebp } = require("../middleware/upload");
const {
  createVisa,
  getAllVisas,
  getPublishedVisas,
  getVisaById,
  deleteVisa,
  togglePublishVisa,
  updateVisa
} = require("../controllers/visaController");

// Create Visa
router.post(
  "/",
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "specialImage", maxCount: 1 },
  ]),
  convertToWebp,
  createVisa
);

// Get all visas (Admin)
router.get("/", getAllVisas);

// Get all published visas (Frontend)
router.get("/published", getPublishedVisas);

// ✅ Get specific published visa by ID (Frontend)
router.get("/published/:id", getVisaById);

// Delete Visa
router.delete("/:id", deleteVisa);

// Publish / Unpublish Visa
router.patch("/publish/:id", togglePublishVisa);

// UPDATE VISA (Admin)
router.patch(
  "/:id",
  upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "specialImage", maxCount: 1 }
  ]),
  convertToWebp,
  updateVisa
);


module.exports = router;
