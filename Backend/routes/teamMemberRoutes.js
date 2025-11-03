const express = require("express");
const router = express.Router();
const {
  createTeamMember,
  getAllTeamMembers,
  getTeamMember,
  updateTeamMember,
  deleteTeamMember,
  togglePublish,
} = require("../controllers/teamMemberController");

const { upload, convertToWebp } = require("../middleware/upload");

// ✅ Create
router.post("/", upload.single("image"), convertToWebp, createTeamMember);

// ✅ Get All
router.get("/", getAllTeamMembers);

// ✅ Get One
router.get("/:id", getTeamMember);

// ✅ Update
router.put("/:id", upload.single("image"), convertToWebp, updateTeamMember);

// ✅ Toggle Publish
router.patch("/:id/publish", togglePublish);

// ✅ Delete
router.delete("/:id", deleteTeamMember);

module.exports = router;
