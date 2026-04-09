const express = require("express");
const router = express.Router();

const authMiddleware = require("../Middlewares/authMiddlewares");
const createUploader = require("../Middlewares/uploadMiddleware");
const uploadMember = createUploader("member");

const {
  createMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember,
} = require("../Controllers/Member");

router.get("/", getMembers);
router.get("/:id", getMemberById);

router.post("/admin", authMiddleware, uploadMember.single("image"), createMember);
router.put(
  "/admin/:id",
  authMiddleware,
  uploadMember.single("image"),
  updateMember,
);
router.delete("/admin/:id", authMiddleware, deleteMember);

module.exports = router;

