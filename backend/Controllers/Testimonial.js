const Testimonial = require("../Models/Testimonial");

const createTestimonial = async (req, res) => {
  try {
    const { name, designation, quote, description } = req.body;
    const image = req.file ? req.file.path : req.body.image;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const testimonial = await Testimonial.create({
      name,
      designation,
      quote,
      description,
      image,
    });

    return res.status(201).json({
      success: true,
      message: "Testimonial created successfully",
      data: testimonial,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, quote, description } = req.body;
    const image = req.file ? req.file.path : req.body.image;

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    testimonial.name = name ?? testimonial.name;
    testimonial.designation = designation ?? testimonial.designation;
    testimonial.quote = quote ?? testimonial.quote;
    testimonial.description = description ?? testimonial.description;
    testimonial.image = image ?? testimonial.image;

    await testimonial.save();

    return res.status(200).json({
      success: true,
      message: "Testimonial updated successfully",
      data: testimonial,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Testimonial.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTestimonial,
  getTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
};
