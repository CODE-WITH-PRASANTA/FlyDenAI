const express = require("express");
const router = express.Router();
const {
  createContact,
  getAllContacts,
  getContact,
  updateContact,
  deleteContact,
  togglePublish,
} = require("../controllers/contactController");

// ✅ Create
router.post("/", createContact);

// ✅ Read
router.get("/", getAllContacts);
router.get("/:id", getContact);

// ✅ Update
router.put("/:id", updateContact);

// ✅ Toggle Publish
router.patch("/:id/publish", togglePublish);

// ✅ Delete
router.delete("/:id", deleteContact);

module.exports = router;
