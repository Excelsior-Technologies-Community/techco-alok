const ContactInfo = require("../Models/ContactInfo");

const createInfo = async (req, res) => {
  try {
    const { heading, para } = req.body;
    const image = req.file ? req.file.filename : req.body.image;

    const existing = await ContactInfo.findOne();
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Contact info already exists. Use update instead",
      });
    }

    const newInfo = await ContactInfo.create({
      image,
      heading,
      para,
    });

    res.status(201).json({
      success: true,
      message: "Contact info created",
      data: newInfo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error creating contact Info",
    });
  }
};

const getInfo = async (req, res) => {
  try {
    const info = await ContactInfo.findOne();

    res.status(200).json({
      success: true,
      data: info,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching contact Info.",
    });
  }
};

const updateInfo = async (req, res) => {
  try {
    const { heading, para } = req.body;
    const image = req.file ? req.file.filename : req.body.image;

    const updated = await ContactInfo.findOneAndUpdate(
      {},
      { image, heading, para },
      { new: true, runValidators: true },
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Contact Info not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact Info Updated",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating contact Info.",
    });
  }
};

const deleteInfo = async (req, res) => {
  try {
    const deleted = await ContactInfo.findOneAndDelete();

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Contact Info Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact Info Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting contact info",
    });
  }
};

module.exports = { createInfo, getInfo, updateInfo, deleteInfo };
