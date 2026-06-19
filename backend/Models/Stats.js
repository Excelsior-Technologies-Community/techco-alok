const mongoose = require("mongoose");

const statsItemSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
  },
  suffix: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: false,
  },
});

const statSchema = new mongoose.Schema(
  {
    stats: [statsItemSchema],
    rightImage: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    ratingValue: {
      type: String,
      default: "",
    },
    ratingText: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Stats", statSchema);
