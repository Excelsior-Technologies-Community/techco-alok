const Blog = require("../Models/Blog");
const fs = require("fs");
const path = require("path");

exports.createBlog = async (req, res) => {
  try {
    const { title, description, author, category, tags, date } = req.body;
    
    let sections = [];
    if (req.body.sections) {
      sections = JSON.parse(req.body.sections);
    }

    const blogData = {
      title,
      description,
      sections,
      author,
      category,
      tags: tags ? tags.split(",") : [],
      date: date || undefined,
    };

    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        if (file.fieldname === "image") {
          blogData.image = `/uploads/blogs/${file.filename}`;
        } else if (file.fieldname.startsWith("sectionImage_")) {
          const index = parseInt(file.fieldname.split("_")[1]);
          if (blogData.sections[index]) {
            blogData.sections[index].url = `/uploads/blogs/${file.filename}`;
          }
        }
      });
    }

    const blog = new Blog(blogData);
    await blog.save();

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { title, description, author, category, tags, date } = req.body;
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    let sections = blog.sections;
    if (req.body.sections) {
      sections = JSON.parse(req.body.sections);
    }

    const updateData = {
      title,
      description,
      sections,
      author,
      category,
      tags: tags ? tags.split(",") : blog.tags,
      date,
    };

    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        if (file.fieldname === "image") {
          if (blog.image) {
            const oldPath = path.join(__dirname, "..", blog.image.replace("/", "\\"));
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
          }
          updateData.image = `/uploads/blogs/${file.filename}`;
        } else if (file.fieldname.startsWith("sectionImage_")) {
          const index = parseInt(file.fieldname.split("_")[1]);
          if (updateData.sections[index]) {
            if (blog.sections[index] && blog.sections[index].url) {
              const oldSectionPath = path.join(__dirname, "..", blog.sections[index].url.replace("/", "\\"));
              if (fs.existsSync(oldSectionPath)) fs.unlinkSync(oldSectionPath);
            }
            updateData.sections[index].url = `/uploads/blogs/${file.filename}`;
          }
        }
      });
    }

    blog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const deleteFile = (filePath) => {
      const fullPath = path.join(__dirname, "..", filePath.replace("/", "\\"));
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    };

    if (blog.image) deleteFile(blog.image);

    if (blog.sections && blog.sections.length > 0) {
      blog.sections.forEach((section) => {
        if (section.type === "image" && section.url) {
          deleteFile(section.url);
        }
      });
    }

    await blog.deleteOne();

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
