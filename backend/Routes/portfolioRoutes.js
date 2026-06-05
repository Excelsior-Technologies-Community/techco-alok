const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/authMiddlewares");
const createUploader = require("../Middlewares/uploadMiddleware");

const uploadPortfolio = createUploader("portfolio");

const {
  getallPortfolio,
  getPortfolioBySlug,
  updatePortfolio,
  deletePortfolio,
  createPortfolio,
} = require("../Controllers/Portfolio");

router.post(
  "/admin/create",
  authMiddleware,
  uploadPortfolio.single("thumbnail"),
  createPortfolio,
);
router.get("/", getallPortfolio);
router.get("/:slug", getPortfolioBySlug);
router.put(
  "/admin/update/:id",
  authMiddleware,
  uploadPortfolio.single("thumbnail"),
  updatePortfolio,
);
router.delete("/admin/delete/:id", authMiddleware, deletePortfolio);

module.exports = router;
