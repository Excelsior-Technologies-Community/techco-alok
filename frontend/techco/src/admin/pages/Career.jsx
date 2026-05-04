import React, { useEffect, useState } from "react";
import { getAdminCareer, upsertCareer, toAssetUrl } from "../api/api";
import "../styles/admin.css";

export default function Career() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const [form, setForm] = useState({
    heading: "",
    paragraph: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [currentImage, setCurrentImage] = useState("");

  const load = async () => {
    setError("");
    setOk("");
    setLoading(true);
    try {
      const res = await getAdminCareer();
      const data = res?.data?.data;
      if (data) {
        setForm({
          heading: data.heading || "",
          paragraph: data.paragraph || "",
        });
        setCurrentImage(data.image || "");
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const saveCareer = async (e) => {
    e.preventDefault();
    setError("");
    setOk("");
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("heading", form.heading);
      fd.append("paragraph", form.paragraph);
      if (imageFile) fd.append("image", imageFile);

      await upsertCareer(fd);
      setOk("Career content saved successfully");
      load();
    } catch (e2) {
      setError(e2.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="admin-pagehead">
        <div>
          <h1 className="admin-title">Careers Page</h1>
          <p className="admin-subtitle">Update Careers page content.</p>
        </div>
        <button className="admin-btn admin-btn--ghost" type="button" onClick={load} disabled={loading}>
          Refresh
        </button>
      </div>

      {error ? <div className="admin-alert admin-alert--error">{error}</div> : null}
      {ok ? <div className="admin-alert admin-alert--ok">{ok}</div> : null}

      <form className="admin-card" onSubmit={saveCareer}>
        <div className="admin-card__title">Main Content</div>

        <label className="admin-field">
          <div className="admin-field__label">Heading</div>
          <input
            className="admin-input"
            value={form.heading}
            onChange={(e) => setForm((p) => ({ ...p, heading: e.target.value }))}
            placeholder="Transform Careers"
            required
          />
        </label>

        <label className="admin-field">
          <div className="admin-field__label">Paragraph</div>
          <textarea
            className="admin-input"
            rows={6}
            value={form.paragraph}
            onChange={(e) => setForm((p) => ({ ...p, paragraph: e.target.value }))}
            placeholder="Career description..."
            required
          />
        </label>

        <div className="admin-grid admin-grid--2">
          <label className="admin-field">
            <div className="admin-field__label">Main Image</div>
            <input className="admin-input" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
            <div className="admin-hint">Leave blank to keep existing image.</div>
          </label>
          
          {currentImage && (
            <div className="admin-field">
              <div className="admin-field__label">Current Image</div>
              <img src={toAssetUrl(currentImage)} alt="Current" style={{ height: 100, borderRadius: 8, objectFit: 'cover' }} />
            </div>
          )}
        </div>

        <button className="admin-btn admin-btn--primary" type="submit" disabled={saving} style={{ width: 'fit-content' }}>
          {saving ? "Saving..." : "Save Career Content"}
        </button>
      </form>
    </div>
  );
}
