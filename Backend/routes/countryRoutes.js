const express = require("express");
const router = express.Router();
const { upload, convertToWebp } = require("../middleware/upload");
const {
  addCountry,
  getCountries,
  deleteCountry,
  updateCountry,
} = require("../controllers/countryController");

// ✅ Routes
router.post("/", upload.single("countryLogo"), convertToWebp, addCountry);
router.put("/:id", upload.single("countryLogo"), convertToWebp, updateCountry);
router.get("/", getCountries);
router.delete("/:id", deleteCountry);

module.exports = router;
