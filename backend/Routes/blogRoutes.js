const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/authMiddlewares");
const createUploader = require("../Middlewares/uploadMiddleware");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} = require("../Controllers/BlogController");

const upload = createUploader("blogs");

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.get("/slug/:slug", getBlogBySlug);

router.post("/", authMiddleware, upload.any(), createBlog);
router.put("/:id", authMiddleware, upload.any(), updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

module.exports = router;
