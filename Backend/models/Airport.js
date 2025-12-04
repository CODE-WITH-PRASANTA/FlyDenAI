const mongoose = require("mongoose");

const AirportSchema = new mongoose.Schema(
  {
    airportName: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    countryName: {
      type: String,
      required: true,
      trim: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Airport", AirportSchema);
