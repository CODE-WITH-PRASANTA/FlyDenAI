const Testimonial = require("../models/Testimonial");
const fs = require("fs-extra");
const path = require("path");

// ✅ Create Testimonial
exports.createTestimonial = async (req, res, next) => {
  try {
    const { name, rating, message } = req.body;

    if (!name || !message) {
      return res
        .status(400)
        .json({ message: "Name and message are required." });
    }

    // ✅ Handle WebP converted file
    let imageUrl = "";
    if (req.files && req.files.image && req.files.image[0]) {
      imageUrl = `/uploads/${req.files.image[0].filename}`;
    }

    const testimonial = await Testimonial.create({
      name,
      rating: rating ? Number(rating) : 0,
      message,
      imageUrl,
      published: false,
    });

    res.status(201).json({ success: true, data: testimonial });
  } catch (err) {
    console.error("❌ Create Testimonial Error:", err);
    next(err);
  }
};

// ✅ Get All Testimonials
exports.getAllTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: testimonials });
  } catch (err) {
    next(err);
  }
};

// ✅ Get Single Testimonial
exports.getTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial)
      return res.status(404).json({ message: "Testimonial not found" });
    res.status(200).json({ success: true, data: testimonial });
  } catch (err) {
    next(err);
  }
};

// ✅ Update Testimonial
exports.updateTestimonial = async (req, res, next) => {
  try {
    const { name, rating, message } = req.body;
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial)
      return res.status(404).json({ message: "Testimonial not found" });

    // ✅ Handle new image (already converted to WebP)
    if (req.files && req.files.image && req.files.image[0]) {
      // Remove old image if exists
      if (testimonial.imageUrl) {
        const oldPath = path.join(__dirname, "..", testimonial.imageUrl);
        await fs.remove(oldPath).catch(() => {});
      }

      testimonial.imageUrl = `/uploads/${req.files.image[0].filename}`;
    }

    testimonial.name = name || testimonial.name;
    testimonial.rating = rating ? Number(rating) : testimonial.rating;
    testimonial.message = message || testimonial.message;

    await testimonial.save();
    res.status(200).json({ success: true, data: testimonial });
  } catch (err) {
    console.error("❌ Update Testimonial Error:", err);
    next(err);
  }
};

// ✅ Toggle Publish
exports.togglePublish = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial)
      return res.status(404).json({ message: "Testimonial not found" });

    testimonial.published = !testimonial.published;
    await testimonial.save();

    res.status(200).json({ success: true, data: testimonial });
  } catch (err) {
    next(err);
  }
};

// ✅ Delete Testimonial
exports.deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial)
      return res.status(404).json({ message: "Testimonial not found" });

    // Remove associated image
    if (testimonial.imageUrl) {
      const filePath = path.join(__dirname, "..", testimonial.imageUrl);
      await fs.remove(filePath).catch(() => {});
    }

    await testimonial.deleteOne();
    res.status(200).json({ success: true, message: "Testimonial deleted" });
  } catch (err) {
    console.error("❌ Delete Testimonial Error:", err);
    next(err);
  }
};
