const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    skillsDescription: {
      type: String,
      default: "",
    },
    skills: {
      type: [
        {
          name: { type: String, required: true },
          percentage: { type: Number, required: true },
        },
      ],
      default: [],
    },
    educationDescription: {
      type: String,
      default: "",
    },
    qualifications: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Member", memberSchema);
