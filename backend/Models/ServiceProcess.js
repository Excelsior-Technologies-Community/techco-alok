const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  paragraph: {
    type: String,
    required: true,
  },
});

const processSchema = new mongoose.Schema(
  {
    sections: [serviceSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Process", processSchema);
