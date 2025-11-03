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
    // SINGLE upload case
    if (req.file) {
      const inputPath = path.join(uploadDir, req.file.filename);
      const ext = path.extname(req.file.filename).toLowerCase();

      // ⛔ Skip conversion if already WebP
      if (ext === ".webp") {
        return next();
      }

      const outputFilename = `${path.parse(req.file.filename).name}.webp`;
      const outputPath = path.join(uploadDir, outputFilename);

      await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
      await fs.remove(inputPath); // delete old file

      req.file.filename = outputFilename;
      req.file.path = outputPath;
    }

    // MULTIPLE upload case
    if (req.files && Object.keys(req.files).length > 0) {
      for (const field in req.files) {
        for (const file of req.files[field]) {
          const inputPath = path.join(uploadDir, file.filename);
          const ext = path.extname(file.filename).toLowerCase();

          // ⛔ Skip conversion if already WebP
          if (ext === ".webp") continue;

          const outputFilename = `${path.parse(file.filename).name}.webp`;
          const outputPath = path.join(uploadDir, outputFilename);

          await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
          await fs.remove(inputPath);

          file.filename = outputFilename;
          file.path = outputPath;
        }
      }
    }

    next();
  } catch (err) {
    console.error("❌ WebP conversion error:", err);
    next(err);
  }
};

module.exports = { upload, convertToWebp };
