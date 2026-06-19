import React, { useEffect, useState } from "react";
import {
  getAdminTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  toAssetUrl,
} from "../api/api";
import "../styles/admin.css";

export default function Testimonials() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({
    name: "",
    designation: "",
    quote: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    setError("");
    setOk("");
    setLoading(true);
    try {
      const res = await getAdminTestimonials();
      setTestimonials(Array.isArray(res?.data?.data) ? res.data.data : []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOk("");
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("designation", form.designation);
      fd.append("quote", form.quote);
      fd.append("description", form.description);
      if (imageFile) fd.append("image", imageFile);

      if (editingId) {
        await updateTestimonial(editingId, fd);
        setOk("Testimonial updated successfully");
      } else {
        if (!imageFile) {
          setError("Client image/avatar is required for new testimonials");
          setSaving(false);
          return;
        }
        await createTestimonial(fd);
        setOk("Testimonial added successfully");
      }

      setForm({ name: "", designation: "", quote: "", description: "" });
      setImageFile(null);
      setEditingId(null);
      load();
    } catch (e2) {
      setError(e2.response?.data?.message || e2.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    setError("");
    setOk("");
    try {
      await deleteTestimonial(id);
      setOk("Testimonial deleted successfully");
      load();
    } catch (e2) {
      setError(e2.message);
    }
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setForm({
      name: item.name || "",
      designation: item.designation || "",
      quote: item.quote || "",
      description: item.description || "",
    });
    setOk("Editing testimonial by " + item.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", designation: "", quote: "", description: "" });
    setImageFile(null);
    setOk("");
  };

  return (
    <div>
      <div className="admin-pagehead">
        <div>
          <h1 className="admin-title">Client Testimonials</h1>
          <p className="admin-subtitle">Manage customer quotes and reviews shown on the Home page.</p>
        </div>
        <button className="admin-btn admin-btn--ghost" type="button" onClick={load} disabled={loading}>
          Refresh
        </button>
      </div>

      {error ? <div className="admin-alert admin-alert--error">{error}</div> : null}
      {ok ? <div className="admin-alert admin-alert--ok">{ok}</div> : null}

      <div className="admin-card">
        <div className="admin-card__title">
          {editingId ? "Edit Testimonial" : "Add New Testimonial"}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-grid admin-grid--2">
            <label className="admin-field">
              <div className="admin-field__label">Client Name</div>
              <input
                className="admin-input"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="Roman Dymtro"
                required
              />
            </label>

            <label className="admin-field">
              <div className="admin-field__label">Designation / Role</div>
              <input
                className="admin-input"
                value={form.designation}
                onChange={(e) => setForm((p) => ({ ...p, designation: e.target.value }))}
                placeholder="Director of Marketing"
                required
              />
            </label>

            <label className="admin-field" style={{ gridColumn: "span 2" }}>
              <div className="admin-field__label">Heading / Quote</div>
              <input
                className="admin-input"
                value={form.quote}
                onChange={(e) => setForm((p) => ({ ...p, quote: e.target.value }))}
                placeholder="Amazing services"
                required
              />
            </label>

            <label className="admin-field" style={{ gridColumn: "span 2" }}>
              <div className="admin-field__label">Feedback / Description</div>
              <textarea
                className="admin-input"
                rows={4}
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                placeholder="As a startup, we needed a technology partner..."
                required
              />
            </label>

            <label className="admin-field">
              <div className="admin-field__label">Client Avatar / Photo</div>
              <input
                className="admin-input"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
              {editingId && <div className="admin-hint">Leave blank to keep existing image.</div>}
            </label>
          </div>

          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <button className="admin-btn admin-btn--primary" type="submit" disabled={saving}>
              {saving ? "Saving..." : editingId ? "Update Testimonial" : "Add Testimonial"}
            </button>
            {editingId && (
              <button className="admin-btn admin-btn--ghost" type="button" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="admin-card">
        <div className="admin-card__title">Testimonials List</div>

        <div className="admin-table">
          <div className="admin-table__head">
            <div>Client</div>
            <div>Heading / Quote</div>
            <div>Feedback</div>
            <div>Photo</div>
            <div />
          </div>
          {testimonials.map((t) => (
            <div className="admin-table__row" key={t._id}>
              <div>
                <div style={{ fontWeight: 600 }}>{t.name}</div>
                <div className="admin-muted" style={{ fontSize: "0.85rem" }}>
                  {t.designation}
                </div>
              </div>
              <div style={{ fontWeight: 500 }}>"{t.quote}"</div>
              <div className="admin-muted" style={{ fontSize: "0.9rem", maxWidth: "400px" }}>
                {t.description}
              </div>
              <div>
                <img src={toAssetUrl(t.image)} alt="" style={{ height: 45, width: 45, borderRadius: "50%", objectFit: "cover" }} />
              </div>
              <div className="admin-actions">
                <button className="admin-btn admin-btn--ghost" type="button" onClick={() => startEdit(t)}>
                  Edit
                </button>
                <button className="admin-btn admin-btn--danger" type="button" onClick={() => handleDelete(t._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
          {testimonials.length === 0 && (
            <div style={{ padding: "20px", textAlign: "center" }} className="admin-muted">
              No testimonials found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
