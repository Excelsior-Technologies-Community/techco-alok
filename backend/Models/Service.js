const mongoose = require("mongoose");

const serviceCardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
});

const servicePageSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    cards: [serviceCardSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", servicePageSchema);
