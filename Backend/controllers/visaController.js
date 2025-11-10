const Visa = require("../models/Visa");
const fs = require("fs-extra");
const path = require("path");

// Helper function to parse JSON safely
const safeJSONParse = (data) => {
  try {
    return JSON.parse(data || "[]");
  } catch {
    return [];
  }
};

// CREATE NEW VISA
const createVisa = async (req, res) => {
  try {
    const {
      country,
      processingTime,
      startingPrice,
      approvalTagline,
      isPopular,
      isNormal,
      visaTypes,
      documents,
      faqs,
      infos,
      description,
      expert,
    } = req.body;

    if (!country || !processingTime || !startingPrice || !approvalTagline || !description) {
      return res.status(400).json({ success: false, message: "Required fields are missing" });
    }

    const bannerFile = req.files?.banner ? req.files.banner[0] : null;
    const specialImageFile = req.files?.specialImage ? req.files.specialImage[0] : null;

    const visa = new Visa({
      country,
      processingTime,
      startingPrice,
      approvalTagline,
      isPopular: isPopular === "true" || isPopular === true,
      isNormal: isNormal === "true" || isNormal === true,
      visaTypes: safeJSONParse(visaTypes),
      documents: safeJSONParse(documents),
      faqs: safeJSONParse(faqs),
      infos: safeJSONParse(infos),
      description,
      expert: expert || "",
      bannerUrl: bannerFile ? `/uploads/${bannerFile.filename}` : undefined,
      specialImageUrl: specialImageFile ? `/uploads/${specialImageFile.filename}` : undefined,
      published: false, // default is unpublished
    });

    await visa.save();
    res.status(201).json({ success: true, message: "Visa created successfully", data: visa });
  } catch (err) {
    console.error("❌ Error creating visa:", err);
    res.status(500).json({ success: false, message: "Server error while creating visa" });
  }
};

// GET ALL VISAS (Admin)
const getAllVisas = async (req, res) => {
  try {
    const visas = await Visa.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: visas.length ? "Visas fetched successfully" : "No visas found",
      data: visas,
    });
  } catch (err) {
    console.error("❌ Error fetching visas:", err);
    res.status(500).json({ success: false, message: "Server error while fetching visas" });
  }
};

// GET PUBLISHED VISAS (Frontend)
const getPublishedVisas = async (req, res) => {
  try {
    const visas = await Visa.find({ published: true }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: visas.length ? "Published visas fetched successfully" : "No published visas found",
      data: visas,
    });
  } catch (err) {
    console.error("❌ Error fetching published visas:", err);
    res.status(500).json({ success: false, message: "Server error while fetching visas" });
  }
};

// DELETE VISA (Admin)
const deleteVisa = async (req, res) => {
  try {
    const visa = await Visa.findById(req.params.id);
    if (!visa) return res.status(404).json({ success: false, message: "Visa not found" });

    // Delete files from server
    [visa.bannerUrl, visa.specialImageUrl].forEach((filePath) => {
      if (filePath) {
        const fullPath = path.join(__dirname, "..", filePath);
        if (fs.existsSync(fullPath)) fs.removeSync(fullPath);
      }
    });

    await visa.deleteOne();
    res.status(200).json({ success: true, message: "Visa deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting visa:", err);
    res.status(500).json({ success: false, message: "Server error while deleting visa" });
  }
};

// PUBLISH / UNPUBLISH VISA
const togglePublishVisa = async (req, res) => {
  try {
    const visa = await Visa.findById(req.params.id);
    if (!visa) return res.status(404).json({ success: false, message: "Visa not found" });

    visa.published = !visa.published; // toggle status
    await visa.save();

    res.status(200).json({
      success: true,
      message: visa.published ? "Visa published successfully" : "Visa unpublished successfully",
      data: visa,
    });
  } catch (err) {
    console.error("❌ Error toggling publish:", err);
    res.status(500).json({ success: false, message: "Server error while toggling publish status" });
  }
};

  // GET VISA BY ID (Frontend)
  const getVisaById = async (req, res) => {
    try {
      const { id } = req.params;
      const visa = await Visa.findById(id);

      if (!visa) {
        return res.status(404).json({ success: false, message: "Visa not found" });
      }

      // Only allow published visas for frontend
      if (!visa.published) {
        return res.status(403).json({ success: false, message: "This visa is not published yet" });
      }

      res.status(200).json({
        success: true,
        message: "Visa fetched successfully",
        data: visa,
      });
    } catch (err) {
      console.error("❌ Error fetching visa by ID:", err);
      res.status(500).json({ success: false, message: "Server error while fetching visa" });
    }
  };


module.exports = {
  createVisa,
  getAllVisas,
  getPublishedVisas,
  deleteVisa,
  togglePublishVisa,
  getVisaById
};
