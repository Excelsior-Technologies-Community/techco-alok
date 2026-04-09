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
    required: true,
  },
});

const statSchema = new mongoose.Schema(
  {
    stats: [statsItemSchema],
    rightImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Stats", statSchema);
