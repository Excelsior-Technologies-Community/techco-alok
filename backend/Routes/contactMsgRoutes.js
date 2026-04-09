const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/authMiddlewares");
const {
  getAllMessage,
  submitMessage,
  updateMsgStatus,
  deleteMsg,
  replyToMessage,
  getUserMessages,
} = require("../Controllers/ContactMsg");

router.post("/submit", submitMessage);
router.get("/admin/msg", authMiddleware, getAllMessage);
router.put("/admin/msg/:id", authMiddleware, updateMsgStatus);
router.put("/admin/msg/reply/:id", authMiddleware, replyToMessage);
router.get("/user/msg", getUserMessages);
router.delete("/admin/msg/:id", authMiddleware, deleteMsg);

module.exports = router;
