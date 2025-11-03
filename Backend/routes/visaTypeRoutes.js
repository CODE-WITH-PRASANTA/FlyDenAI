const express = require("express");
const {
  createVisaType,
  getAllVisaTypes,
  getVisaTypeById,
  updateVisaType,
  deleteVisaType,
} = require("../controllers/visaTypeController");

const { upload, convertToWebp } = require("../middleware/upload");

const router = express.Router();

// ✅ Multi-field upload (Visa + Consultant)
const uploadFields = upload.fields([
  { name: "visaImage", maxCount: 1 },
  { name: "consultantImage", maxCount: 1 },
]);

router.post("/", uploadFields, convertToWebp, createVisaType);
router.get("/", getAllVisaTypes);
router.get("/:id", getVisaTypeById);
router.put("/:id", uploadFields, convertToWebp, updateVisaType);
router.delete("/:id", deleteVisaType);

module.exports = router;
