const express = require("express");
const router = express.Router();
const { upload, convertToWebp } = require("../middleware/upload");
const {
  createVisa,
  getAllVisas,
  deleteVisa,
} = require("../controllers/visaController");

// ✅ Create Visa (with single banner upload)
router.post("/", upload.single("banner"), convertToWebp, createVisa);

// ✅ Get All Visas
router.get("/", getAllVisas);

// ✅ Delete Visa
router.delete("/:id", deleteVisa);

module.exports = router;
