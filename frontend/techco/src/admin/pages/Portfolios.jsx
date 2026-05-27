import React, { useEffect, useState } from "react";
import {
  getAdminPortfolios,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  toAssetUrl,
} from "../api/api";

export default function Portfolios() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    category: "",
    service: "",
    industry: "",
    tags: "",
    thumbnail: null,
    content: [],
  });

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const res = await getAdminPortfolios();
      setPortfolios(res.data.data);
    } catch (err) {
      setError("Failed to fetch portfolios");
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
      setFormData((prev) => ({ ...prev, thumbnail: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const addContentBlock = (type) => {
    const block = { type, text: "", items: [], meta: { services: "", client: "", location: "", completedDate: "" } };
    setFormData((prev) => ({
      ...prev,
      content: [...prev.content, block],
    }));
  };

  const removeContentBlock = (index) => {
    setFormData((prev) => ({
      ...prev,
      content: prev.content.filter((_, i) => i !== index),
    }));
  };

  const handleBlockChange = (index, field, value) => {
    setFormData((prev) => {
      const newContent = [...prev.content];
      newContent[index][field] = value;
      return { ...prev, content: newContent };
    });
  };
  
  const handleMetaChange = (index, field, value) => {
    setFormData((prev) => {
      const newContent = [...prev.content];
      newContent[index].meta[field] = value;
      return { ...prev, content: newContent };
    });
  };

  const handleItemsChange = (index, value) => {
    const itemsArray = value.split("\n");
    handleBlockChange(index, "items", itemsArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("shortDescription", formData.shortDescription);
      data.append("category", formData.category);
      data.append("service", formData.service);
      data.append("industry", formData.industry);
      
      const tagsArray = formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag);
      tagsArray.forEach((tag, idx) => {
         data.append(`tags[${idx}]`, tag);
      });

      if (formData.thumbnail instanceof File) {
        data.append("thumbnail", formData.thumbnail);
      }

      data.append("content", JSON.stringify(formData.content));

      if (editingId) {
        await updatePortfolio(editingId, data);
        setSuccess("Portfolio updated successfully");
      } else {
        await createPortfolio(data);
        setSuccess("Portfolio created successfully");
      }

      setIsFormOpen(false);
      setEditingId(null);
      resetForm();
      fetchPortfolios();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save portfolio");
    }
  };

  const handleEdit = (portfolio) => {
    setEditingId(portfolio._id);
    setFormData({
      title: portfolio.title,
      shortDescription: portfolio.shortDescription || "",
      category: portfolio.category,
      service: portfolio.service || "",
      industry: portfolio.industry || "",
      tags: portfolio.tags.join(", "),
      thumbnail: portfolio.thumbnail,
      content: portfolio.content || [],
    });
    setPreviewImage(portfolio.thumbnail ? toAssetUrl(portfolio.thumbnail) : null);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this portfolio?")) return;
    try {
      await deletePortfolio(id);
      setSuccess("Portfolio deleted successfully");
      fetchPortfolios();
    } catch (err) {
      setError("Failed to delete portfolio");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      shortDescription: "",
      category: "",
      service: "",
      industry: "",
      tags: "",
      thumbnail: null,
      content: [],
    });
    setPreviewImage(null);
    setEditingId(null);
  };

  return (
    <div className="admin-blogs">
      <div className="admin-pagehead">
        <div>
          <h1 className="admin-title">Portfolios</h1>
          <p className="admin-subtitle">Manage your portfolio projects</p>
        </div>
        {!isFormOpen && (
          <button
            className="admin-btn admin-btn--primary"
            onClick={() => {
              resetForm();
              setIsFormOpen(true);
            }}
          >
            <i className="fa-solid fa-plus" /> Add New Portfolio
          </button>
        )}
      </div>

      {error && <div className="admin-alert admin-alert--error">{error}</div>}
      {success && <div className="admin-alert admin-alert--ok">{success}</div>}

      {isFormOpen ? (
        <form className="admin-card" onSubmit={handleSubmit}>
          <div className="admin-card__title">
            {editingId ? "Edit Portfolio" : "Create New Portfolio"}
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

          <div className="admin-grid admin-grid--2">
            <div className="admin-field">
              <label className="admin-field__label">Service (e.g. Logo Design)</label>
              <input
                className="admin-input"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
              />
            </div>
            <div className="admin-field">
              <label className="admin-field__label">Industry (e.g. Finance)</label>
              <input
                className="admin-input"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="admin-field">
            <label className="admin-field__label">Short Description</label>
            <textarea
              className="admin-input admin-textarea"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleInputChange}
            />
          </div>

          <div className="admin-field">
            <label className="admin-field__label">Tags (comma separated)</label>
            <input
              className="admin-input"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="e.g. Web Design, AI, Marketing"
            />
          </div>

          <div className="admin-field">
            <label className="admin-field__label">Thumbnail Image</label>
            <input type="file" onChange={handleFileChange} accept="image/*" />
            {previewImage && (
              <div className="admin-profile__avatar mt-2">
                <img src={previewImage} alt="Preview" style={{ width: "100px", height: "auto", borderRadius: "8px" }} />
              </div>
            )}
          </div>

          <hr className="my-4 opacity-10" />

          <div className="admin-card__title mt-4">Content Sections</div>
          <div className="admin-sections">
            {formData.content.map((block, index) => (
              <div key={index} className="admin-card bg-light mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge bg-primary text-uppercase">{block.type}</span>
                  <button
                    type="button"
                    className="admin-btn admin-btn--danger admin-btn--sm"
                    onClick={() => removeContentBlock(index)}
                  >
                    <i className="fa-solid fa-trash" />
                  </button>
                </div>

                {block.type === "heading" && (
                  <input
                    className="admin-input"
                    placeholder="Heading text"
                    value={block.text}
                    onChange={(e) => handleBlockChange(index, "text", e.target.value)}
                  />
                )}

                {block.type === "paragraph" && (
                  <textarea
                    className="admin-input admin-textarea"
                    placeholder="Paragraph text"
                    value={block.text}
                    onChange={(e) => handleBlockChange(index, "text", e.target.value)}
                  />
                )}

                {block.type === "meta" && (
                  <div className="admin-grid admin-grid--2">
                    <input
                      className="admin-input"
                      placeholder="Services"
                      value={block.meta?.services || ""}
                      onChange={(e) => handleMetaChange(index, "services", e.target.value)}
                    />
                    <input
                      className="admin-input"
                      placeholder="Client"
                      value={block.meta?.client || ""}
                      onChange={(e) => handleMetaChange(index, "client", e.target.value)}
                    />
                    <input
                      className="admin-input"
                      placeholder="Location"
                      value={block.meta?.location || ""}
                      onChange={(e) => handleMetaChange(index, "location", e.target.value)}
                    />
                    <input
                      className="admin-input"
                      placeholder="Completed Date"
                      value={block.meta?.completedDate || ""}
                      onChange={(e) => handleMetaChange(index, "completedDate", e.target.value)}
                    />
                  </div>
                )}

                {block.type === "features" && (
                  <textarea
                    className="admin-input admin-textarea"
                    placeholder="Enter feature items here, separated by new lines"
                    value={block.items ? block.items.join("\n") : ""}
                    onChange={(e) => handleItemsChange(index, e.target.value)}
                    rows={4}
                  />
                )}
              </div>
            ))}

            <div className="d-flex flex-wrap gap-2 mt-3">
              <button
                type="button"
                className="admin-btn admin-btn--ghost"
                onClick={() => addContentBlock("heading")}
              >
                <i className="fa-solid fa-heading" /> Add Heading
              </button>
              <button
                type="button"
                className="admin-btn admin-btn--ghost"
                onClick={() => addContentBlock("paragraph")}
              >
                <i className="fa-solid fa-paragraph" /> Add Paragraph
              </button>
              <button
                type="button"
                className="admin-btn admin-btn--ghost"
                onClick={() => addContentBlock("meta")}
              >
                <i className="fa-solid fa-info" /> Add Meta Info
              </button>
              <button
                type="button"
                className="admin-btn admin-btn--ghost"
                onClick={() => addContentBlock("features")}
              >
                <i className="fa-solid fa-list-ul" /> Add Features List
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
              {editingId ? "Update Portfolio" : "Create Portfolio"}
            </button>
          </div>
        </form>
      ) : (
        <div className="admin-card">
          <div className="admin-table">
            <div className="admin-table__head">
              <span>Title</span>
              <span>Category</span>
              <span>Actions</span>
            </div>
            {loading ? (
              <div className="text-center p-4">Loading portfolios...</div>
            ) : portfolios.length === 0 ? (
              <div className="text-center p-4">No portfolios found.</div>
            ) : (
              portfolios.map((portfolio) => (
                <div key={portfolio._id} className="admin-table__row">
                  <div className="d-flex align-items-center gap-3">
                    {portfolio.thumbnail && (
                      <img
                        src={toAssetUrl(portfolio.thumbnail)}
                        alt=""
                        style={{ width: "40px", height: "40px", borderRadius: "8px", objectFit: "cover" }}
                      />
                    )}
                    <span className="fw-bold">{portfolio.title}</span>
                  </div>
                  <span>{portfolio.category}</span>
                  <div className="admin-actions">
                    <button
                      className="admin-btn admin-btn--ghost"
                      onClick={() => handleEdit(portfolio)}
                    >
                      <i className="fa-solid fa-pen" />
                    </button>
                    <button
                      className="admin-btn admin-btn--danger"
                      onClick={() => handleDelete(portfolio._id)}
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
