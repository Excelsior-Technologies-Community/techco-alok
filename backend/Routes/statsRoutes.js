const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/authMiddlewares");
const createUploader = require("../Middlewares/uploadMiddleware");

const {
  createOrUpdateStats,
  getStats,
  addStatItem,
  updateStatItem,
  deleteStatItem,
  deleteStats,
} = require("../Controllers/stats");

const uploadStats = createUploader("stats");
const uploadStatItemIcon = createUploader("staticons");

router.post(
  "/admin",
  authMiddleware,
  uploadStats.single("rightImage"),
  createOrUpdateStats
);

router.get("/", getStats);

router.delete("/admin", authMiddleware, deleteStats);

router.post(
  "/admin/item",
  authMiddleware,
  uploadStatItemIcon.single("icon"),
  addStatItem
);

router.put(
  "/admin/item/:statItemId",
  authMiddleware,
  uploadStatItemIcon.single("icon"),
  updateStatItem
);

router.delete("/admin/item/:statItemId", authMiddleware, deleteStatItem);

module.exports = router;
