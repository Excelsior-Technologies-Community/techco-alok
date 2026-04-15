const mongoose = require("mongoose");

const contentBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["heading", "paragraph", "meta", "features"],
    required: true,
  },
  text: {
    type: String,
  },
  meta: {
    services: String,
    client: String,
    location: String,
    completedDate: String,
  },
  items: [String],
});

const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },

    tags: {
      type: [String],
      default: [],
    },
    thumbnail: {
      type: String,
      required: true,
    },

    shortDescription: {
      type: String,
    },

    content: [contentBlockSchema],
  },
  { timestamps: true },
);

portfolioSchema.pre("save", function () {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
