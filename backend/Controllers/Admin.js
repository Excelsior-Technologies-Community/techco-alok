const Admin = require("../Models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const exist = await Admin.findOne({ email });

    if (exist) {
      return next({ status: 400, message: "Admin already exists" });
    }
    await Admin.create({ name, email, password });
    res.status(201).json({
      message: "Admin registered successfully",
    });
  } catch (error) {
    next(error);
  }
};

const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return next({ status: 400, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return next({ status: 400, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        profileImage: admin.profileImage,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const admin = await Admin.findById(req.user._id);

    if (!admin) {
      return next({ status: 404, message: "Admin not found" });
    }

    admin.name = name || admin.name;
    admin.email = email || admin.email;

    if (req.file) {
      admin.profileImage = req.file.path;
    }

    await admin.save();

    res.json({
      message: "Profile updated successfully",
      user: admin,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getProfile,
  updateProfile,
};
