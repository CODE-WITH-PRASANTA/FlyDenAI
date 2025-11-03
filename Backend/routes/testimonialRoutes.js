const express = require("express");
const router = express.Router();
const {
  createTestimonial,
  getAllTestimonials,
  getTestimonial,
  updateTestimonial,
  deleteTestimonial,
  togglePublish,
} = require("../controllers/testimonialController");

const { upload, convertToWebp } = require("../middleware/upload");

// ✅ Create (supports your upload middleware logic)
router.post("/", upload.fields([{ name: "image", maxCount: 1 }]), convertToWebp, createTestimonial);

// ✅ Read
router.get("/", getAllTestimonials);
router.get("/:id", getTestimonial);

// ✅ Update
router.put("/:id", upload.fields([{ name: "image", maxCount: 1 }]), convertToWebp, updateTestimonial);

// ✅ Toggle Publish
router.patch("/:id/publish", togglePublish);

// ✅ Delete
router.delete("/:id", deleteTestimonial);

module.exports = router;
