import React, { useEffect, useState } from "react";
import {
  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  toAssetUrl,
} from "../api/api";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    category: "",
    tags: "",
    date: "",
    image: null,
    sections: [],
  });

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await getAdminBlogs();
      setBlogs(res.data.data);
    } catch (err) {
      setError("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const addSection = (type) => {
    setFormData((prev) => ({
      ...prev,
      sections: [...prev.sections, { type, text: "", url: null, url2: null, preview: null, preview2: null }],
    }));
  };

  const removeSection = (index) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  const handleSectionChange = (index, field, value) => {
    setFormData((prev) => {
      const newSections = [...prev.sections];
      newSections[index][field] = value;
      return { ...prev, sections: newSections };
    });
  };

  const handleSectionFileChange = (index, e, isSecond = false) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => {
        const newSections = [...prev.sections];
        if (isSecond) {
          newSections[index].file2 = file;
          newSections[index].preview2 = URL.createObjectURL(file);
        } else {
          newSections[index].file = file;
          newSections[index].preview = URL.createObjectURL(file);
        }
        return { ...prev, sections: newSections };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("author", formData.author);
      data.append("category", formData.category);
      data.append("tags", formData.tags);
      if (formData.date) data.append("date", formData.date);
      if (formData.image instanceof File) data.append("image", formData.image);

      // Handle sections
      const sectionsToSubmit = formData.sections.map((s, index) => {
        const cleanSection = { type: s.type, text: s.text };
        if (s.url && !s.file) cleanSection.url = s.url;
        if (s.url2 && !s.file2) cleanSection.url2 = s.url2;
        return cleanSection;
      });
      data.append("sections", JSON.stringify(sectionsToSubmit));

      // Append section files
      formData.sections.forEach((s, index) => {
        if ((s.type === "image" || s.type === "image-grid" || s.type === "image-list") && s.file) {
          data.append(`sectionImage_${index}`, s.file);
        }
        if (s.type === "image-grid" && s.file2) {
          data.append(`sectionImage2_${index}`, s.file2);
        }
      });

      if (editingId) {
        await updateBlog(editingId, data);
        setSuccess("Blog updated successfully");
      } else {
        await createBlog(data);
        setSuccess("Blog created successfully");
      }

      setIsFormOpen(false);
      setEditingId(null);
      resetForm();
      fetchBlogs();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save blog");
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setFormData({
      title: blog.title,
      description: blog.description,
      author: blog.author,
      category: blog.category,
      tags: blog.tags.join(", "),
      date: blog.date,
      image: blog.image,
      sections: blog.sections.map(s => ({ ...s, preview: s.url ? toAssetUrl(s.url) : null, preview2: s.url2 ? toAssetUrl(s.url2) : null })),
    });
    setPreviewImage(blog.image ? toAssetUrl(blog.image) : null);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await deleteBlog(id);
      setSuccess("Blog deleted successfully");
      fetchBlogs();
    } catch (err) {
      setError("Failed to delete blog");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      author: "",
      category: "",
      tags: "",
      date: "",
      image: null,
      sections: [],
    });
    setPreviewImage(null);
    setEditingId(null);
  };

  return (
    <div className="admin-blogs">
      <div className="admin-pagehead">
        <div>
          <h1 className="admin-title">Blogs</h1>
          <p className="admin-subtitle">Manage your blog posts</p>
        </div>
        {!isFormOpen && (
          <button
            className="admin-btn admin-btn--primary"
            onClick={() => {
              resetForm();
              setIsFormOpen(true);
            }}
          >
            <i className="fa-solid fa-plus" /> Add New Blog
          </button>
        )}
      </div>

      {error && <div className="admin-alert admin-alert--error">{error}</div>}
      {success && <div className="admin-alert admin-alert--ok">{success}</div>}

      {isFormOpen ? (
        <form className="admin-card" onSubmit={handleSubmit}>
          <div className="admin-card__title">
            {editingId ? "Edit Blog" : "Create New Blog"}
          </div>

          <div className="admin-grid admin-grid--2">
            <div className="admin-field">
              <label className="admin-field__label">Title</label>
              <input
                className="admin-input"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="admin-field">
              <label className="admin-field__label">Category</label>
              <input
                className="admin-input"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="admin-field">
            <label className="admin-field__label">Short Description</label>
            <textarea
              className="admin-input admin-textarea"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="admin-grid admin-grid--2">
            <div className="admin-field">
              <label className="admin-field__label">Author</label>
              <input
                className="admin-input"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="admin-field">
              <label className="admin-field__label">Date (Optional)</label>
              <input
                className="admin-input"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                placeholder="DD/MM/YYYY"
              />
            </div>
          </div>

          <div className="admin-field">
            <label className="admin-field__label">Tags (comma separated)</label>
            <input
              className="admin-input"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="e.g. Technology, AI, WebDev"
            />
          </div>

          <div className="admin-field">
            <label className="admin-field__label">Main Image</label>
            <input type="file" onChange={handleFileChange} accept="image/*" />
            {previewImage && (
              <div className="admin-profile__avatar mt-2">
                <img src={previewImage} alt="Preview" />
              </div>
            )}
          </div>

          <hr className="my-4 opacity-10" />

          <div className="admin-card__title mt-4">Content Sections</div>
          <div className="admin-sections">
            {formData.sections.map((section, index) => (
              <div key={index} className="admin-card bg-light mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge bg-primary text-uppercase">{section.type}</span>
                  <button
                    type="button"
                    className="admin-btn admin-btn--danger admin-btn--sm"
                    onClick={() => removeSection(index)}
                  >
                    <i className="fa-solid fa-trash" />
                  </button>
                </div>

                {section.type === "heading" && (
                  <input
                    className="admin-input"
                    placeholder="Heading text"
                    value={section.text}
                    onChange={(e) => handleSectionChange(index, "text", e.target.value)}
                  />
                )}

                {section.type === "paragraph" && (
                  <textarea
                    className="admin-input admin-textarea"
                    placeholder="Paragraph text"
                    value={section.text}
                    onChange={(e) => handleSectionChange(index, "text", e.target.value)}
                  />
                )}

                {section.type === "image" && (
                  <div className="admin-field">
                    <input
                      type="file"
                      onChange={(e) => handleSectionFileChange(index, e, false)}
                      accept="image/*"
                    />
                    {section.preview && (
                      <div className="mt-2" style={{ maxWidth: "200px" }}>
                        <img src={section.preview} alt="Section Preview" className="img-fluid rounded" />
                      </div>
                    )}
                  </div>
                )}
                {(section.type === "list" || section.type === "numbered-list") && (
                  <textarea
                    className="admin-input admin-textarea"
                    placeholder="Enter list items here, separated by new lines"
                    value={section.text}
                    onChange={(e) => handleSectionChange(index, "text", e.target.value)}
                    rows={4}
                  />
                )}

                {section.type === "image-grid" && (
                  <div className="admin-grid admin-grid--2">
                    <div className="admin-field">
                      <label className="admin-field__label">Image 1</label>
                      <input
                        type="file"
                        onChange={(e) => handleSectionFileChange(index, e, false)}
                        accept="image/*"
                      />
                      {section.preview && (
                        <div className="mt-2" style={{ maxWidth: "200px" }}>
                          <img src={section.preview} alt="Section Preview 1" className="img-fluid rounded" />
                        </div>
                      )}
                    </div>
                    <div className="admin-field">
                      <label className="admin-field__label">Image 2</label>
                      <input
                        type="file"
                        onChange={(e) => handleSectionFileChange(index, e, true)}
                        accept="image/*"
                      />
                      {section.preview2 && (
                        <div className="mt-2" style={{ maxWidth: "200px" }}>
                          <img src={section.preview2} alt="Section Preview 2" className="img-fluid rounded" />
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {section.type === "image-list" && (
                  <div className="admin-grid admin-grid--2">
                    <div className="admin-field">
                      <label className="admin-field__label">Image</label>
                      <input
                        type="file"
                        onChange={(e) => handleSectionFileChange(index, e, false)}
                        accept="image/*"
                      />
                      {section.preview && (
                        <div className="mt-2" style={{ maxWidth: "200px" }}>
                          <img src={section.preview} alt="Section Preview" className="img-fluid rounded" />
                        </div>
                      )}
                    </div>
                    <div className="admin-field">
                      <label className="admin-field__label">List Items (one per line)</label>
                      <textarea
                        className="admin-input admin-textarea"
                        placeholder="Enter list items here..."
                        value={section.text}
                        onChange={(e) => handleSectionChange(index, "text", e.target.value)}
                        rows={4}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="d-flex flex-wrap gap-2 mt-3">
              <button
                type="button"
                className="admin-btn admin-btn--ghost"
                onClick={() => addSection("heading")}
              >
                <i className="fa-solid fa-heading" /> Add Heading
              </button>
              <button
                type="button"
                className="admin-btn admin-btn--ghost"
                onClick={() => addSection("paragraph")}
              >
                <i className="fa-solid fa-paragraph" /> Add Paragraph
              </button>
              <button
                type="button"
                className="admin-btn admin-btn--ghost"
                onClick={() => addSection("image")}
              >
                <i className="fa-solid fa-image" /> Add Image
              </button>
              <button
                type="button"
                className="admin-btn admin-btn--ghost"
                onClick={() => addSection("list")}
              >
                <i className="fa-solid fa-list-ul" /> Add List
              </button>
              <button
                type="button"
                className="admin-btn admin-btn--ghost"
                onClick={() => addSection("numbered-list")}
              >
                <i className="fa-solid fa-list-ol" /> Add Numbered List
              </button>
              <button
                type="button"
                className="admin-btn admin-btn--ghost"
                onClick={() => addSection("image-grid")}
              >
                <i className="fa-solid fa-images" /> Add Image Grid
              </button>
              <button
                type="button"
                className="admin-btn admin-btn--ghost"
                onClick={() => addSection("image-list")}
              >
                <i className="fa-solid fa-file-image" /> Add Image + List
              </button>
            </div>
          </div>

          <div className="admin-actions mt-4">
            <button
              type="button"
              className="admin-btn"
              onClick={() => {
                setIsFormOpen(false);
                resetForm();
              }}
            >
              Cancel
            </button>
            <button type="submit" className="admin-btn admin-btn--primary">
              {editingId ? "Update Blog" : "Create Blog"}
            </button>
          </div>
        </form>
      ) : (
        <div className="admin-card">
          <div className="admin-table">
            <div className="admin-table__head">
              <span>Title</span>
              <span>Category</span>
              <span>Author</span>
              <span>Actions</span>
            </div>
            {loading ? (
              <div className="text-center p-4">Loading blogs...</div>
            ) : blogs.length === 0 ? (
              <div className="text-center p-4">No blogs found.</div>
            ) : (
              blogs.map((blog) => (
                <div key={blog._id} className="admin-table__row">
                  <div className="d-flex align-items-center gap-3">
                    {blog.image && (
                      <img
                        src={toAssetUrl(blog.image)}
                        alt=""
                        style={{ width: "40px", height: "40px", borderRadius: "8px", objectFit: "cover" }}
                      />
                    )}
                    <span className="fw-bold">{blog.title}</span>
                  </div>
                  <span>{blog.category}</span>
                  <span>{blog.author}</span>
                  <div className="admin-actions">
                    <button
                      className="admin-btn admin-btn--ghost"
                      onClick={() => handleEdit(blog)}
                    >
                      <i className="fa-solid fa-pen" />
                    </button>
                    <button
                      className="admin-btn admin-btn--danger"
                      onClick={() => handleDelete(blog._id)}
                    >
                      <i className="fa-solid fa-trash" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
