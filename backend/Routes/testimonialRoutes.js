const express = require("express");
const router = express.Router();

const authMiddleware = require("../Middlewares/authMiddlewares");
const createUploader = require("../Middlewares/uploadMiddleware");
const uploadTestimonial = createUploader("testimonial");

const {
  createTestimonial,
  getTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} = require("../Controllers/Testimonial");

router.get("/", getTestimonials);
router.get("/:id", getTestimonialById);

router.post("/admin", authMiddleware, uploadTestimonial.single("image"), createTestimonial);
router.put(
  "/admin/:id",
  authMiddleware,
  uploadTestimonial.single("image"),
  updateTestimonial,
);
router.delete("/admin/:id", authMiddleware, deleteTestimonial);

module.exports = router;
