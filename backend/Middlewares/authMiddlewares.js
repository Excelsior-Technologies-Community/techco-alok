const jwt = require("jsonwebtoken");
const Admin = require("../Models/Admin");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next({ status: 401, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      return next({ status: 401, message: "Admin not found" });
    }

    req.user = admin;
    next();
  } catch (error) {
    next({ status: 401, message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
