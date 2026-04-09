import React, { useEffect, useState } from "react";
import {
  addBetterFeature,
  deleteBetterFeature,
  getBetter,
  upsertBetter,
} from "../api/api";
import "../styles/admin.css";

export default function Better() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const [form, setForm] = useState({
    badgeText: "",
    breadcrumbText: "",
    heading: "",
  });
  const [leftImageFile, setLeftImageFile] = useState(null);

  const [features, setFeatures] = useState([]);
  const [featureTitle, setFeatureTitle] = useState("");
  const [featureIconFile, setFeatureIconFile] = useState(null);

  const load = async () => {
    setError("");
    setOk("");
    setLoading(true);
    try {
      const res = await getBetter();
      const data = res?.data?.data;
      if (data) {
        setForm({
          badgeText: data.badgeText || "",
          breadcrumbText: data.breadcrumbText || "",
          heading: data.heading || "",
        });
        setFeatures(Array.isArray(data.features) ? data.features : []);
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
      fd.append("badgeText", form.badgeText);
      fd.append("breadcrumbText", form.breadcrumbText);
      fd.append("heading", form.heading);
      fd.append("features", JSON.stringify(features));
      if (leftImageFile) fd.append("leftImage", leftImageFile);

      const res = await upsertBetter(fd);
      const data = res?.data?.data || res?.data;
      setOk("Saved successfully");
      setFeatures(Array.isArray(data?.features) ? data.features : features);
    } catch (e2) {
      setError(e2.message);
    } finally {
      setSaving(false);
    }
  };

  const addFeature = async (e) => {
    e.preventDefault();
    setError("");
    setOk("");
    try {
      const fd = new FormData();
      fd.append("title", featureTitle);
      if (featureIconFile) fd.append("icon", featureIconFile);
      const res = await addBetterFeature(fd);
      const data = res?.data?.data || res?.data;
      setFeatures(Array.isArray(data?.features) ? data.features : []);
      setFeatureTitle("");
      setFeatureIconFile(null);
      setOk("Feature added");
    } catch (e2) {
      setError(e2.message);
    }
  };

  const deleteFeature = async (featureId) => {
    setError("");
    setOk("");
    try {
      const res = await deleteBetterFeature(featureId);
      const data = res?.data?.data || res?.data;
      setFeatures(Array.isArray(data?.features) ? data.features : []);
      setOk("Feature deleted");
    } catch (e2) {
      setError(e2.message);
    }
  };

  return (
    <div>
      <div className="admin-pagehead">
        <div>
          <h1 className="admin-title">Better</h1>
          <p className="admin-subtitle">Update Better section content.</p>
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
              placeholder="Better"
            />
          </label>
        </div>

        <label className="admin-field">
          <div className="admin-field__label">Heading</div>
          <input
            className="admin-input"
            value={form.heading}
            onChange={(e) => setForm((p) => ({ ...p, heading: e.target.value }))}
            placeholder="Why Our Services are Better Than Others?"
            required
          />
        </label>

        <label className="admin-field">
          <div className="admin-field__label">Left image</div>
          <input className="admin-input" type="file" accept="image/*" onChange={(e) => setLeftImageFile(e.target.files?.[0] || null)} />
          <div className="admin-hint">If you don't choose a file, image will remain unchanged.</div>
        </label>

        <button className="admin-btn admin-btn--primary" type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
      </form>

      <div className="admin-card">
        <div className="admin-card__title">Features</div>

        <form className="admin-inline" onSubmit={addFeature}>
          <input
            className="admin-input"
            value={featureTitle}
            onChange={(e) => setFeatureTitle(e.target.value)}
            placeholder="Feature title"
            required
          />
          <input className="admin-input" type="file" accept="image/*" onChange={(e) => setFeatureIconFile(e.target.files?.[0] || null)} />
          <button className="admin-btn admin-btn--primary" type="submit">
            Add
          </button>
        </form>

        <div className="admin-table">
          <div className="admin-table__head">
            <div>Title</div>
            <div>Icon</div>
            <div />
          </div>
          {features.map((f) => (
            <div className="admin-table__row" key={f._id || f.title}>
              <div>{f.title}</div>
              <div className="admin-muted">{f.icon}</div>
              <div className="admin-actions">
                {f._id ? (
                  <button className="admin-btn admin-btn--danger" type="button" onClick={() => deleteFeature(f._id)}>
                    Delete
                  </button>
                ) : (
                  <span className="admin-muted">Save to get id</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

