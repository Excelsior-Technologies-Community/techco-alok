import React, { useEffect, useState } from "react";
import { api } from "../api/client";
import "../styles/admin.css";

export default function Team() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const [form, setForm] = useState({
    breadcrumbText: "",
    badgeText: "",
    heading: "",
    description: "",
  });
  const [rightImageFile, setRightImageFile] = useState(null);

  const load = async () => {
    setError("");
    setOk("");
    setLoading(true);
    try {
      const res = await api.get("/api/team");
      const data = res?.data || res;
      if (data) {
        setForm({
          breadcrumbText: data.breadcrumbText || "",
          badgeText: data.badgeText || "",
          heading: data.heading || "",
          description: data.description || "",
        });
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

  const save = async (e) => {
    e.preventDefault();
    setError("");
    setOk("");
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("breadcrumbText", form.breadcrumbText);
      fd.append("badgeText", form.badgeText);
      fd.append("heading", form.heading);
      fd.append("description", form.description);
      if (rightImageFile) fd.append("rightImage", rightImageFile);

      await api.postForm("/api/team/admin", fd);
      setOk("Saved successfully");
      setRightImageFile(null);
      await load();
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
          <h1 className="admin-title">Team</h1>
          <p className="admin-subtitle">Update Team section content.</p>
        </div>
        <button className="admin-btn admin-btn--ghost" type="button" onClick={load} disabled={loading}>
          Refresh
        </button>
      </div>

      {error ? <div className="admin-alert admin-alert--error">{error}</div> : null}
      {ok ? <div className="admin-alert admin-alert--ok">{ok}</div> : null}

      <form className="admin-card" onSubmit={save}>
        <div className="admin-card__title">Main content</div>

        <div className="admin-grid admin-grid--2">
          <label className="admin-field">
            <div className="admin-field__label">Badge text</div>
            <input
              className="admin-input"
              value={form.badgeText}
              onChange={(e) => setForm((p) => ({ ...p, badgeText: e.target.value }))}
              placeholder="Why Us"
            />
          </label>

          <label className="admin-field">
            <div className="admin-field__label">Breadcrumb text</div>
            <input
              className="admin-input"
              value={form.breadcrumbText}
              onChange={(e) => setForm((p) => ({ ...p, breadcrumbText: e.target.value }))}
              placeholder="Team"
            />
          </label>
        </div>

        <label className="admin-field">
          <div className="admin-field__label">Heading</div>
          <input
            className="admin-input"
            value={form.heading}
            onChange={(e) => setForm((p) => ({ ...p, heading: e.target.value }))}
            required
          />
        </label>

        <label className="admin-field">
          <div className="admin-field__label">Description</div>
          <textarea
            className="admin-input admin-textarea"
            value={form.description}
            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            required
          />
        </label>

        <label className="admin-field">
          <div className="admin-field__label">Right image</div>
          <input className="admin-input" type="file" accept="image/*" onChange={(e) => setRightImageFile(e.target.files?.[0] || null)} />
        </label>

        <button className="admin-btn admin-btn--primary" type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}

