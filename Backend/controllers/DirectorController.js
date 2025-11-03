const Director = require("../models/DirectorModel");
const fs = require("fs-extra");
const path = require("path");

// ✅ Add Director (with achievements upload)
exports.addDirector = async (req, res) => {
  try {
    const { designation, name, about, address, phone, email } = req.body;

    if (!designation || !name) {
      return res.status(400).json({ message: "Name and designation are required." });
    }

    // Allow only one director at a time
    const existing = await Director.findOne();
    if (existing) {
      if (req.files && req.files.achievements) {
        for (const file of req.files.achievements) {
          const filePath = path.join(__dirname, "..", "uploads", file.filename);
          await fs.remove(filePath);
        }
      }
      return res.status(400).json({
        message: "Director already exists. Please delete the existing one to add a new one.",
      });
    }

    // ✅ Handle certificate images
    let achievements = [];
    if (req.files && req.files.achievements) {
      achievements = req.files.achievements.map((f) => `/uploads/${f.filename}`);
    }

    const newDirector = new Director({
      designation,
      name,
      about,
      address,
      phone,
      email,
      achievements,
    });

    await newDirector.save();
    res.status(201).json({ message: "Director added successfully", newDirector });
  } catch (error) {
    console.error("❌ Error adding director:", error);
    res.status(500).json({ message: "Server error while adding director" });
  }
};

// ✅ Fetch all directors
exports.getDirectors = async (req, res) => {
  try {
    const directors = await Director.find();
    res.status(200).json(directors);
  } catch (error) {
    console.error("❌ Error fetching directors:", error);
    res.status(500).json({ message: "Server error while fetching directors" });
  }
};

// ✅ Delete Director (Remove record + delete uploaded files)
exports.deleteDirector = async (req, res) => {
  try {
    const { id } = req.params;
    const director = await Director.findById(id);

    if (!director) {
      return res.status(404).json({ message: "Director not found" });
    }

    // ✅ Delete uploaded certificate images (achievements)
    if (director.achievements && director.achievements.length > 0) {
      for (const imgPath of director.achievements) {
        try {
          // Ensure correct relative path from project root
          const filePath = path.join(__dirname, "..", imgPath);

          // Check if file exists before deleting
          await fs.access(filePath);
          await fs.unlink(filePath);

          console.log(`🗑️ Deleted file: ${filePath}`);
        } catch (err) {
          console.warn(`⚠️ Could not delete file ${imgPath}:`, err.message);
        }
      }
    }

    // ✅ Delete director record from MongoDB
    await Director.findByIdAndDelete(id);

    res.status(200).json({ message: "Director and files deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting director:", error);
    res.status(500).json({ message: "Server error while deleting director" });
  }
};