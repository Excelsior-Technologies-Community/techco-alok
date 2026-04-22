const express = require("express");
const router = express.Router();

const authMiddleware = require("../Middlewares/authMiddlewares");
const createUploader = require("../Middlewares/uploadMiddleware");
const upload = createUploader("contact");
const {
  getInfo,
  createInfo,
  updateInfo,
  deleteInfo,
} = require("../Controllers/ContactInfo");

router.get("/info", getInfo);
router.post("/admin/info", authMiddleware, upload.single("image"), createInfo);
router.put("/admin/info/:id", authMiddleware, upload.single("image"), updateInfo);
router.delete("/admin/info/:id", authMiddleware, deleteInfo);

module.exports = router;
