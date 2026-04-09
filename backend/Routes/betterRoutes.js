const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/authMiddlewares");
const createUploader = require("../Middlewares/uploadMiddleware");
const uploadLeft = createUploader("left");
const uploadFeature = createUploader("feature");
const {
  CreateOrUpdate,
  getBetter,
  deleteBetter,
  addFeature,
  updateFeature,
  deleteFeature,
} = require("../Controllers/BetterController");

router.post(
  "/admin",
  authMiddleware,
  uploadLeft.single("leftImage"),
  CreateOrUpdate,
);
router.get("/", getBetter);

router.delete("/admin", authMiddleware, deleteBetter);

router.post(
  "/admin/feature",
  authMiddleware,
  uploadFeature.single("icon"),
  addFeature,
);
router.put(
  "/admin/feature/:featureId",
  authMiddleware,
  uploadFeature.single("icon"),
  updateFeature,
);
router.delete("/admin/feature/:featureId", authMiddleware, deleteFeature);

module.exports = router;