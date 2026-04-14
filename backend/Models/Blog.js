const mongoose = require("mongoose");
const slugify = require("slugify");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    sections: [
      {
        type: {
          type: String,
          enum: ["heading", "paragraph", "image"],
          required: true,
        },
        text: String,
        url: String,
      },
    ],
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    date: {
      type: String,
      default: () => new Date().toLocaleDateString("en-GB"),
    },
    image: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    tags: [String],
    comments: [
      {
        user: String,
        comment: String,
        date: { type: Date, default: Date.now },
      },
    ],
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },
  { timestamps: true },
);

blogSchema.pre("save", function () {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
