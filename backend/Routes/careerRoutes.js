const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/authMiddlewares");
const createUploader = require("../Middlewares/uploadMiddleware");
const uploadCareer = createUploader("career");

const { getCareer, CreateOrUpdate } = require("../Controllers/Career");

router.get("/", getCareer);
router.post(
  "/admin",
  authMiddleware,
  uploadCareer.single("image"),
  CreateOrUpdate,
);

module.exports = router;