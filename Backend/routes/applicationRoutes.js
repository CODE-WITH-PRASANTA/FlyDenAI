const express = require("express");
const router = express.Router();
const {
  createApplication,
  saveTravellers,
  savePaymentInfo,
  uploadGlobalDocs,
  getAllApplications,
  getApplicationById,
  getByPaymentStatus,
  getCompletedApplications,
  getInProgressApplications,
  getTravellers,
  getGlobalDocs,
  getPaymentInfo,
  approveApplication,
  deleteApplication
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
  upload.fields([
    { name: "passportCopy" },
    { name: "photo" },
    { name: "travelItinerary" },
    { name: "additionalDocument" }
  ]),
  convertToWebp,
  uploadGlobalDocs
);

// Fetch All
router.get("/all", getAllApplications);

// Fetch Single
router.get("/:id", getApplicationById);

// Filter by payment status
router.get("/payment/status/:status", getByPaymentStatus);

// Completed apps
router.get("/status/completed/all", getCompletedApplications);

// In-progress apps
router.get("/status/in-progress/all", getInProgressApplications);

// Only travellers
router.get("/:id/travellers", getTravellers);

// Only global docs
router.get("/:id/global-docs", getGlobalDocs);

// Only payment info
router.get("/:id/payment-info", getPaymentInfo);

// APPROVE APPLICATION
router.put("/:id/approve", approveApplication);

// DELETE APPLICATION
router.delete("/:id/delete", deleteApplication);


module.exports = router;
