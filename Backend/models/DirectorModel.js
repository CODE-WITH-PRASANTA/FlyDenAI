const mongoose = require("mongoose");

const DirectorSchema = new mongoose.Schema(
  {
    designation: { type: String, required: true },
    name: { type: String, required: true },
    about: { type: String },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    achievements: [{ type: String }], // store certificate URLs or local paths
  },
  { timestamps: true }
);

module.exports = mongoose.model("Director", DirectorSchema);
