const mongoose = require("mongoose");

const contactMsgSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    reply: {
      type: String,
    },
    repliedAt: {
      type: Date,
    },
    subject: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is Required"],
    },
    status: {
      type: String,
      enum: ["New", "Read", "Replied"],
      default: "New",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("ContactMessage", contactMsgSchema);
