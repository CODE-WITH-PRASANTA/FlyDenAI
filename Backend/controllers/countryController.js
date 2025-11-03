// controllers/countryController.js
const Country = require("../models/Country");
const path = require("path");
const fs = require("fs");

// @desc    Add new country
// @route   POST /api/countries
exports.addCountry = async (req, res) => {
  try {
    const { countryName, placeName } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Please upload a logo image" });
    }

    const logoUrl = `/uploads/${req.file.filename}`;

    const country = await Country.create({
      countryName,
      placeName,
      logoUrl,
    });

    res.status(201).json({ message: "Country added successfully", country });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get all countries
// @route   GET /api/countries
exports.getCountries = async (req, res) => {
  try {
    const countries = await Country.find().sort({ createdAt: -1 });
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Delete a country (DB + image)
// @route   DELETE /api/countries/:id
exports.deleteCountry = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) return res.status(404).json({ message: "Country not found" });

    // ✅ Construct full path of the image
    const filePath = path.join(__dirname, "..", country.logoUrl);

    // ✅ Delete image file from uploads folder
    fs.unlink(filePath, (err) => {
      if (err) {
        console.warn("⚠️ Image file not found or already deleted:", filePath);
      } else {
        console.log("🗑️ Deleted file:", filePath);
      }
    });

    // ✅ Delete record from MongoDB
    await country.deleteOne();

    res.status(200).json({ message: "Country deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Update country (with optional new logo)
// @route   PUT /api/countries/:id
exports.updateCountry = async (req, res) => {
  try {
    const { countryName, placeName } = req.body;
    const updateData = { countryName, placeName };

    if (req.file) {
      updateData.logoUrl = `/uploads/${req.file.filename}`;
    }

    const country = await Country.findById(req.params.id);
    if (!country) return res.status(404).json({ message: "Country not found" });

    // ✅ If a new image is uploaded, remove the old one
    if (req.file && country.logoUrl) {
      const oldFilePath = path.join(__dirname, "..", country.logoUrl);
      fs.unlink(oldFilePath, (err) => {
        if (!err) console.log("🗑️ Old image deleted:", oldFilePath);
      });
    }

    // ✅ Update the record
    const updatedCountry = await Country.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json({
      message: "Country updated successfully",
      country: updatedCountry,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
