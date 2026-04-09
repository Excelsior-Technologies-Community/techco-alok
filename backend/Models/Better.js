const mongoose = require("mongoose");

const betterFeatureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {}
);

const betterSchema = new mongoose.Schema(
  {
    badgeText: {
      type: String,
      trim: true,
    },
    breadcrumbText: {
      type: String,
      trim: true,
    },
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    leftImage: {
      type: String,
      required: true,
      trim: true,
    },
    features: {
      type: [betterFeatureSchema],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Better", betterSchema);
