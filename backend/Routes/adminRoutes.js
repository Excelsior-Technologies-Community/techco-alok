const express = require("express");
const router = express.Router();

const {
  registerAdmin,
  loginAdmin,
  getProfile,
  updateProfile,
} = require("../Controllers/Admin");
const authMiddleware = require("../Middlewares/authMiddlewares");
const createUploader = require("../Middlewares/uploadMiddleware");
const uploadAdmin = createUploader("admin");

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

router.get("/profile", authMiddleware, getProfile);
router.put(
  "/update",
  authMiddleware,
  uploadAdmin.single("image"),
  updateProfile,
);

module.exports = router;
