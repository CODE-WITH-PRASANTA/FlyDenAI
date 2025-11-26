const multer = require("multer");
const fs = require("fs-extra");
const path = require("path");
const sharp = require("sharp");

// ✅ Ensure uploads directory exists
const uploadDir = path.join(__dirname, "..", "uploads");
fs.ensureDirSync(uploadDir);

// ✅ Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ✅ Convert uploaded image(s) to WebP (skip if already .webp)
const convertToWebp = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) return next();

    for (const file of req.files) {
      const ext = path.extname(file.originalname).toLowerCase();

      // Skip PDFs
      if (ext === ".pdf" || file.mimetype === "application/pdf") continue;

      const inputPath = file.path;
      const outputFilename = `${path.parse(file.filename).name}.webp`;
      const outputPath = path.join(uploadDir, outputFilename);

      await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
      await fs.remove(inputPath);

      file.filename = outputFilename;
      file.path = outputPath;
      file.originalname = outputFilename;
      file.mimetype = "image/webp";

      const stat = await fs.stat(outputPath);
      file.size = stat.size;
    }

    next();
  } catch (err) {
    console.error("❌ WebP conversion error:", err);
    next(err);
  }
};





module.exports = { upload, convertToWebp };
