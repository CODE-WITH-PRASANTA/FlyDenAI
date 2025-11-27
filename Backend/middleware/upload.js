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

// ----------------------------
// FINAL STABLE WEBP CONVERTER
// ----------------------------
const convertToWebp = async (req, res, next) => {
  try {
    if (!req.files) return next();

    // normalise files → ARRAY
    let files = [];

    if (Array.isArray(req.files)) {
      files = req.files; // upload.any()
    } else {
      Object.keys(req.files).forEach((key) => {
        files.push(...req.files[key]); // upload.fields()
      });
    }

    for (const file of files) {
      await processSingleFile(file);
    }

    next();
  } catch (err) {
    console.log("WEBP ERROR:", err);
    next();
  }
};

// ----------------------------
// SINGLE FILE PROCESSOR
// ----------------------------
async function processSingleFile(file) {
  if (!file) return;

  const originalExt = path.extname(file.originalname || "").toLowerCase();

  // IF PDF, DOCX — skip
  if (![".png", ".jpg", ".jpeg"].includes(originalExt)) {
    return;
  }

  const newFilename = `${file.filename}.webp`; // add .webp
  const newPath = path.join(uploadDir, newFilename);

  await sharp(file.path)
    .webp({ quality: 80 })
    .toFile(newPath);

  await fs.remove(file.path);

  // update multer object
  file.filename = newFilename;
  file.path = newPath;
  file.mimetype = "image/webp";
}

module.exports = { upload, convertToWebp };
