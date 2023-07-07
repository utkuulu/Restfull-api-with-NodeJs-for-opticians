const mongoose = require("mongoose");

const EyeglassLensSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  index: {
    type: String,
    required: true,
  },
  QRcode: {
    type: String,
  },
  count: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("EyeglassLens", EyeglassLensSchema);
