const mongoose = require("mongoose");

const workCardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  tag: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const worksPageSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
      default: "Our Recent Best Works",
    },
    description: {
      type: String,
      required: true,
      default: "Our recent projects highlight our expertise in delivering tailored solutions that meet the unique needs and objectives of our clients,custom software.",
    },
    cards: [workCardSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Works", worksPageSchema);
