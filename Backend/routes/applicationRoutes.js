const express = require("express");
const router = express.Router();
const {
  createApplication,
  saveTravellers,
  savePaymentInfo,
  uploadGlobalDocs,
} = require("../controllers/applicationController");
const { upload, convertToWebp } = require("../middleware/upload");

// STEP 1
router.post("/create", createApplication);

// STEP 2 (multiple dynamic fields)
router.put("/:id/travellers", upload.any(), convertToWebp, saveTravellers);

// STEP 3 PAYMENT
router.put("/:id/payment", savePaymentInfo);

// STEP 4 GLOBAL DOCS
router.put(
  "/:id/global-docs",
  upload.fields([{ name: "ticket" }, { name: "hotel" }, { name: "others" }]),
  convertToWebp,
  uploadGlobalDocs
);

module.exports = router;
