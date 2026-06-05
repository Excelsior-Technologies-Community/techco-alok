const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/authMiddlewares");
const {
  getServicePage,
  upsertServicePage,
  addServiceCard,
  updateServiceCard,
  deleteServiceCard,
} = require("../Controllers/Service");

const createUploader = require("../Middlewares/uploadMiddleware");

const uploadServices = createUploader("services");
const uploadCards = createUploader("service_cards");

router.get("/", getServicePage);

router.post(
  "/admin",
  authMiddleware,
  uploadServices.single("image"),
  upsertServicePage
);

router.post(
  "/admin/card",
  authMiddleware,
  uploadCards.single("image"),
  addServiceCard
);

router.put(
  "/admin/card/:cardId",
  authMiddleware,
  uploadCards.single("image"),
  updateServiceCard
);

router.delete("/admin/card/:cardId", authMiddleware, deleteServiceCard);

module.exports = router;
