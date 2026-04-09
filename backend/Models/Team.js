const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    breadcrumbText: {
      type: String,
      trim: true,
    },
    badgeText: {
      type: String,
      trim: true,
    },
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    rightImage: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Team", teamSchema);
