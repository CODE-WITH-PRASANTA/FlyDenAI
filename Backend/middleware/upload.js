const multer = require("multer");
const fs = require("fs-extra");
const path = require("path");
const sharp = require("sharp");

const uploadDir = path.join(__dirname, "..", "uploads");
fs.ensureDirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

/**
 * SAFE WebP converter — 100% compatible with upload.any()
 */
const convertToWebp = async (req, res, next) => {
  try {
    // If no files at all → skip
    if (!req.files || req.files.length === 0) return next();

    for (const file of req.files) {
      if (!file) continue;

      // Extract extension safely
      const ext = path.extname(file.originalname || "").toLowerCase();

      // Skip PDFs, docs, mp4 etc
      if (![".jpg", ".jpeg", ".png"].includes(ext)) {
        continue;
      }

      const newFilename = file.filename.replace(ext, ".webp");
      const newPath = path.join(uploadDir, newFilename);

      await sharp(file.path)
        .webp({ quality: 80 })
        .toFile(newPath);

      // Remove original file
      await fs.remove(file.path);

      // Update multer file object
      file.filename = newFilename;
      file.path = newPath;
      file.mimetype = "image/webp";
    }

    next();
  } catch (e) {
    console.log("WebP Error:", e);
    next(); // do NOT break application
  }
};

module.exports = { upload, convertToWebp };
