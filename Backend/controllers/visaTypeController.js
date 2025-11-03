const VisaType = require("../models/VisaType");
const fs = require("fs-extra");
const path = require("path");


// ✅ Create Visa Type
exports.createVisaType = async (req, res) => {
  try {
    const {
      visaName,
      visaDesc,
      visaOverview,
      visaProcess,
      features,
      specialFeatures,
      consultantName,
      consultantAbout,
    } = req.body;

    // ✅ Only store relative paths
    const visaImageUrl = req.files?.visaImage
      ? `/uploads/${req.files.visaImage[0].filename}`
      : null;

    const consultantImageUrl = req.files?.consultantImage
      ? `/uploads/${req.files.consultantImage[0].filename}`
      : null;

    const visaType = await VisaType.create({
      visaName,
      visaDesc,
      visaOverview,
      visaProcess,
      features: features ? JSON.parse(features) : [],
      specialFeatures: specialFeatures ? JSON.parse(specialFeatures) : [],
      visaImageUrl,
      consultant: {
        name: consultantName,
        about: consultantAbout,
        imageUrl: consultantImageUrl,
      },
    });

    res.status(201).json({ success: true, data: visaType });
  } catch (err) {
    console.error("❌ Error creating VisaType:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Get All Visa Types
exports.getAllVisaTypes = async (req, res) => {
  try {
    const visas = await VisaType.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: visas });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Get Single Visa Type
exports.getVisaTypeById = async (req, res) => {
  try {
    const visa = await VisaType.findById(req.params.id);
    if (!visa) return res.status(404).json({ message: "Visa not found" });
    res.status(200).json({ success: true, data: visa });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Update Visa Type
exports.updateVisaType = async (req, res) => {
  try {
    const existingVisa = await VisaType.findById(req.params.id);
    if (!existingVisa)
      return res.status(404).json({ message: "Visa not found" });

    const visaImageUrl = req.files?.visaImage
      ? `/uploads/${req.files.visaImage[0].filename}`
      : existingVisa.visaImageUrl;

    const consultantImageUrl = req.files?.consultantImage
      ? `/uploads/${req.files.consultantImage[0].filename}`
      : existingVisa.consultant.imageUrl;

    const updatedVisa = await VisaType.findByIdAndUpdate(
      req.params.id,
      {
        visaName: req.body.visaName,
        visaDesc: req.body.visaDesc,
        visaOverview: req.body.visaOverview,
        visaProcess: req.body.visaProcess,
        features: req.body.features
          ? JSON.parse(req.body.features)
          : existingVisa.features,
        specialFeatures: req.body.specialFeatures
          ? JSON.parse(req.body.specialFeatures)
          : existingVisa.specialFeatures,
        visaImageUrl,
        consultant: {
          name: req.body.consultantName,
          about: req.body.consultantAbout,
          imageUrl: consultantImageUrl,
        },
      },
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedVisa });
  } catch (err) {
    console.error("❌ Error updating VisaType:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Delete Visa Type
exports.deleteVisaType = async (req, res) => {
  try {
    const visa = await VisaType.findById(req.params.id);
    if (!visa) return res.status(404).json({ message: "Visa not found" });

    // 🧹 Remove uploaded images
    if (visa.visaImageUrl)
      await fs.remove(path.join(__dirname, "..", visa.visaImageUrl));
    if (visa.consultant?.imageUrl)
      await fs.remove(path.join(__dirname, "..", visa.consultant.imageUrl));

    await visa.deleteOne();

    res.status(200).json({ success: true, message: "Visa deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting VisaType:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
