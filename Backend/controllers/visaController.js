const Visa = require("../models/Visa");
const path = require("path");
const fs = require("fs");


exports.createVisa = async (req, res) => {
  try {
    const {
      country,
      processingTime,
      startingPrice,
      approvalTime,
      description,
      isPopular,
      isNormal,
      expert,
      visaTypes,
      documents,
      faqs,
      infos,
    } = req.body;

    // ✅ Fix banner path (no absolute system path)
    let bannerUrl = "";
    if (req.file) {
      // Get relative path like "uploads/filename.webp"
      const filePath = req.file.path.replace(/\\/g, "/");
      const uploadsIndex = filePath.indexOf("uploads/");
      bannerUrl =
        uploadsIndex !== -1 ? "/" + filePath.substring(uploadsIndex) : "/" + filePath;
    }

    const visa = new Visa({
      country,
      processingTime,
      startingPrice,
      approvalTime,
      description,
      isPopular,
      isNormal,
      expert: expert ? expert.split(",") : [],
      bannerUrl,
      visaTypes: visaTypes ? JSON.parse(visaTypes) : [],
      documents: documents ? JSON.parse(documents) : [],
      faqs: faqs ? JSON.parse(faqs) : [],
      infos: infos ? JSON.parse(infos) : [],
    });

    await visa.save();
    res.status(201).json({ message: "Visa posted successfully ✅", visa });
  } catch (err) {
    console.error("❌ Error creating visa:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.getAllVisas = async (_, res) => {
  try {
    const visas = await Visa.find().sort({ createdAt: -1 });
    res.json(visas);
  } catch (err) {
    res.status(500).json({ message: "Error fetching visas" });
  }
};

exports.deleteVisa = async (req, res) => {
  try {
    const visa = await Visa.findById(req.params.id);

    if (!visa) {
      return res.status(404).json({ message: "Visa not found ❌" });
    }

    // ✅ Delete banner image from uploads folder if it exists
    if (visa.bannerUrl) {
      // Remove leading slash (if any)
      const relativePath = visa.bannerUrl.replace(/^\//, "");
      const filePath = path.join(__dirname, "..", relativePath);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`🗑️ Deleted file: ${filePath}`);
      } else {
        console.log("⚠️ File not found on server, skipping delete:", filePath);
      }
    }

    // ✅ Delete from MongoDB
    await Visa.findByIdAndDelete(req.params.id);

    res.json({ message: "Visa deleted successfully ✅" });
  } catch (err) {
    console.error("❌ Error deleting visa:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};