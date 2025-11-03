const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema(
  {
    countryName: {
      type: String,
      required: true,
      trim: true,
    },
    placeName: {
      type: String,
      required: true,
      trim: true,
    },
    logoUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Country", countrySchema);
