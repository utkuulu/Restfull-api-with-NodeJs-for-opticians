const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
  frame: {
    type: String,
  },
  farGlassesNumber: {
    rightEye: {
      sph: {
        type: String,
      },
      cyl: {
        type: String,
      },
      axis: {
        type: String,
      },
    },
    leftEye: {
      sph: {
        type: String,
      },
      cyl: {
        type: String,
      },
      axis: {
        type: String,
      },
    },
  },
  nearGlassesNumber: {
    rightEye: {
      sph: {
        type: String,
      },
      cyl: {
        type: String,
      },
      axis: {
        type: String,
      },
    },
    leftEye: {
      sph: {
        type: String,
      },
      cyl: {
        type: String,
      },
      axis: {
        type: String,
      },
    },
  },
  lens: {
    type: String,
  },
  solution: {
    type: String,
  },
  sunglasses: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const CustomerSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  IDnumber: {
    type: String,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  sales: [SaleSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Sale", SaleSchema);
module.exports = mongoose.model("Customer", CustomerSchema);
