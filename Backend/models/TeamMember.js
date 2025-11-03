const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    experience: { type: String },
    instagram: { type: String },
    facebook: { type: String },
    twitter: { type: String },
    whatsapp: { type: String },
    phone: { type: String },
    email: { type: String },
    imageUrl: { type: String }, // ✅ stores WebP URL
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TeamMember", teamMemberSchema);
