const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/authMiddlewares");
const {
  CreateOrUpdate,
  getAbout,
  addCard,
  updateCard,
  deleteCard,
} = require("../Controllers/Aboutus");

const createUploader = require("../Middlewares/uploadMiddleware");

const uploadAbout = createUploader("about");
const uploadCards = createUploader("cards");

router.post(
  "/admin",
  authMiddleware,
  uploadAbout.single("image"),
  CreateOrUpdate,
);
router.get("/", getAbout);
router.post(
  "/admin/card",
  authMiddleware,
  uploadCards.single("image"),
  addCard,
);
router.put(
  "/admin/card/:cardId",
  authMiddleware,
  uploadCards.single("image"),
  updateCard,
);
router.delete("/admin/card/:cardId", authMiddleware, deleteCard);

module.exports = router;
