const express = require("express");
const router = express.Router();
const {
  addDirector,
  getDirectors,
  deleteDirector,
} = require("../controllers/DirectorController");
const { upload, convertToWebp } = require("../middleware/upload");

router.post(
  "/add",
  upload.fields([{ name: "achievements", maxCount: 10 }]),
  convertToWebp,
  addDirector
);
router.get("/get", getDirectors);
router.delete("/delete/:id", deleteDirector);

module.exports = router;
