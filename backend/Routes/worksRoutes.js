const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/authMiddlewares");
const {
  getWorksPage,
  upsertWorksPage,
  addWorksCard,
  updateWorksCard,
  deleteWorksCard,
} = require("../Controllers/Works");

const createUploader = require("../Middlewares/uploadMiddleware");

const uploadWorksCards = createUploader("works_cards");

router.get("/", getWorksPage);

router.post(
  "/admin",
  authMiddleware,
  upsertWorksPage
);

router.post(
  "/admin/card",
  authMiddleware,
  uploadWorksCards.single("image"),
  addWorksCard
);

router.put(
  "/admin/card/:cardId",
  authMiddleware,
  uploadWorksCards.single("image"),
  updateWorksCard
);

router.delete("/admin/card/:cardId", authMiddleware, deleteWorksCard);

module.exports = router;
