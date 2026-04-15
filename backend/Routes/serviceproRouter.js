const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/authMiddlewares");
const {
  getProcessSection,
  saveProcessSections,
} = require("../Controllers/ServicePro");

router.get("/", getProcessSection);
router.post("/admin", authMiddleware, saveProcessSections);

module.exports = router;
