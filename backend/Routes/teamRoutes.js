const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/authMiddlewares");
const createUploader = require("../Middlewares/uploadMiddleware");
const uploadTeam = createUploader("team");
const { CreateOrUpdate, getTeam, deleteTeam } = require("../Controllers/Team");

router.post(
  "/admin",
  authMiddleware,
  uploadTeam.single("rightImage"),
  CreateOrUpdate,
);
router.get("/", getTeam);
router.delete("/admin/delete", deleteTeam);

module.exports = router;
