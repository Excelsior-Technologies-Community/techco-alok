const Member = require("../Models/Member");

const createMember = async (req, res) => {
  try {
    const { name, position, experience, email, phone } = req.body;
    const image = req.file ? req.file.path : req.body.image;

    const member = await Member.create({
      name,
      image,
      position,
      experience,
      email,
      phone,
    });

    return res.status(201).json({
      success: true,
      message: "Member created successfully",
      data: member,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: members,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findById(id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: member,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, experience, email, phone } = req.body;
    const image = req.file ? req.file.path : req.body.image;

    const member = await Member.findById(id);
    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    member.name = name ?? member.name;
    member.position = position ?? member.position;
    member.experience = experience ?? member.experience;
    member.email = email ?? member.email;
    member.phone = phone ?? member.phone;
    member.image = image ?? member.image;

    await member.save();

    return res.status(200).json({
      success: true,
      message: "Member updated successfully",
      data: member,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Member.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Member deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember,
};
