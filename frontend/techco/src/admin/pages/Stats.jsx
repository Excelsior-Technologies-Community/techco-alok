import React, { useEffect, useState } from "react";
import {
  getStats,
  upsertStats,
  addStatItem,
  deleteStatItem,
  toAssetUrl,
} from "../api/api";
import "../styles/admin.css";

export default function Stats() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const [rightImage, setRightImage] = useState("");
  const [rightImageFile, setRightImageFile] = useState(null);

  const [form, setForm] = useState({
    heading: "",
    description: "",
    ratingValue: "",
    ratingText: "",
  });

  const [stats, setStats] = useState([]);
  
  const [statNumber, setStatNumber] = useState("");
  const [statSuffix, setStatSuffix] = useState("");
  const [statText, setStatText] = useState("");
  const [statIconFile, setStatIconFile] = useState(null);

  const load = async () => {
    setError("");
    setOk("");
    setLoading(true);
    try {
      const res = await getStats();
      const data = res?.data?.data;
      if (data) {
        setRightImage(data.rightImage || "");
        setStats(Array.isArray(data.stats) ? data.stats : []);
        setForm({
          heading: data.heading || "",
          description: data.description || "",
          ratingValue: data.ratingValue || "",
          ratingText: data.ratingText || "",
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

  const saveMain = async (e) => {
    e.preventDefault();
    setError("");
    setOk("");
    setSaving(true);
    try {
      const fd = new FormData();
      if (rightImageFile) {
        fd.append("rightImage", rightImageFile);
      }
      fd.append("stats", JSON.stringify(stats));
      fd.append("heading", form.heading);
      fd.append("description", form.description);
      fd.append("ratingValue", form.ratingValue);
      fd.append("ratingText", form.ratingText);

      const res = await upsertStats(fd);
      const data = res?.data?.data || res?.data;
      setOk("Stats content saved successfully");
      if (data) {
        setRightImage(data.rightImage || "");
        setStats(Array.isArray(data.stats) ? data.stats : stats);
        setForm({
          heading: data.heading || "",
          description: data.description || "",
          ratingValue: data.ratingValue || "",
          ratingText: data.ratingText || "",
        });
      }
    } catch (e2) {
      setError(e2.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAddStatItem = async (e) => {
    e.preventDefault();
    setError("");
    setOk("");
    if (!statIconFile) {
      setError("Please select an icon image for the stat item.");
      return;
    }
    try {
      const fd = new FormData();
      fd.append("number", statNumber);
      fd.append("suffix", statSuffix);
      fd.append("text", statText);
      fd.append("icon", statIconFile);

      const res = await addStatItem(fd);
      const data = res?.data?.data || res?.data;
      if (data) {
        setStats(Array.isArray(data.stats) ? data.stats : []);
      }
      setStatNumber("");
      setStatSuffix("");
      setStatText("");
      setStatIconFile(null);
      
      const fileInput = document.getElementById("stat-icon-input");
      if (fileInput) fileInput.value = "";
      
      setOk("Stat item added successfully!");
    } catch (e2) {
      setError(e2.message);
    }
  };

  const handleDeleteStatItem = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this stat item?")) {
      return;
    }
    setError("");
    setOk("");
    try {
      const res = await deleteStatItem(itemId);
      const data = res?.data?.data || res?.data;
      if (data) {
        setStats(Array.isArray(data.stats) ? data.stats : []);
      }
      setOk("Stat item deleted successfully!");
    } catch (e2) {
      setError(e2.message);
    }
  };

  return (
    <div>
      <div className="admin-pagehead">
        <div>
          <h1 className="admin-title">Odometer & Stats</h1>
          <p className="admin-subtitle">Manage home page statistics & Hero section (e.g. 150+, 88%).</p>
        </div>
        <button className="admin-btn admin-btn--ghost" type="button" onClick={load} disabled={loading}>
          Refresh
        </button>
      </div>

      {error ? <div className="admin-alert admin-alert--error">{error}</div> : null}
      {ok ? <div className="admin-alert admin-alert--ok">{ok}</div> : null}

      <form className="admin-card" onSubmit={saveMain}>
        <div className="admin-card__title">Main & Left Section Settings</div>

        <label className="admin-field">
          <div className="admin-field__label">Heading</div>
          <input
            className="admin-input"
            value={form.heading}
            onChange={(e) => setForm((p) => ({ ...p, heading: e.target.value }))}
            placeholder="e.g. Grow your Business Organic & IT Solution Technology"
          />
        </label>

        <label className="admin-field">
          <div className="admin-field__label">Description Text</div>
          <textarea
            className="admin-input"
            rows={3}
            value={form.description}
            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            placeholder="e.g. In today's competitive business..."
          />
        </label>

        <div className="admin-grid admin-grid--2">
          <label className="admin-field">
            <div className="admin-field__label">Rating Value</div>
            <input
              className="admin-input"
              value={form.ratingValue}
              onChange={(e) => setForm((p) => ({ ...p, ratingValue: e.target.value }))}
              placeholder="e.g. 4.8"
            />
          </label>

          <label className="admin-field">
            <div className="admin-field__label">Rating Description</div>
            <input
              className="admin-input"
              value={form.ratingText}
              onChange={(e) => setForm((p) => ({ ...p, ratingText: e.target.value }))}
              placeholder="e.g. From 200+ reviews"
            />
          </label>
        </div>

        <div className="admin-grid admin-grid--2" style={{ borderTop: "1px solid #eee", paddingTop: "20px", marginTop: "10px" }}>
          <div className="admin-field">
            <div className="admin-field__label">Right Section Image</div>
            <input 
              className="admin-input" 
              type="file" 
              accept="image/*" 
              onChange={(e) => setRightImageFile(e.target.files?.[0] || null)} 
            />
            <div className="admin-hint">This image is displayed on the right of the statistics section.</div>
          </div>
          
          <div className="admin-field">
            <div className="admin-field__label">Current Right Image Preview</div>
            {rightImage ? (
              <div style={{ marginTop: "10px" }}>
                <img 
                  src={toAssetUrl(rightImage)} 
                  alt="Right section preview" 
                  style={{ maxHeight: "120px", borderRadius: "8px", border: "1px solid #ccc" }} 
                />
              </div>
            ) : (
              <div className="admin-muted" style={{ marginTop: "10px" }}>No image uploaded yet.</div>
            )}
          </div>
        </div>

        <button className="admin-btn admin-btn--primary" type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Main Content"}
        </button>
      </form>

      <div className="admin-card">
        <div className="admin-card__title">Add New Odometer Stat Item</div>
        
        <form onSubmit={handleAddStatItem}>
          <div className="admin-grid admin-grid--3" style={{ marginBottom: "15px" }}>
            <label className="admin-field">
              <div className="admin-field__label">Number</div>
              <input
                className="admin-input"
                type="text"
                value={statNumber}
                onChange={(e) => setStatNumber(e.target.value)}
                placeholder="e.g. 150, 88"
                required
              />
            </label>

            <label className="admin-field">
              <div className="admin-field__label">Suffix</div>
              <input
                className="admin-input"
                type="text"
                value={statSuffix}
                onChange={(e) => setStatSuffix(e.target.value)}
                placeholder="e.g. +, %"
                required
              />
            </label>

            <div className="admin-field">
              <div className="admin-field__label">Icon File</div>
              <input
                id="stat-icon-input"
                className="admin-input"
                type="file"
                accept="image/*"
                onChange={(e) => setStatIconFile(e.target.files?.[0] || null)}
                required
              />
            </div>
          </div>

          <label className="admin-field" style={{ marginBottom: "15px" }}>
            <div className="admin-field__label">Description Text</div>
            <input
              className="admin-input"
              type="text"
              value={statText}
              onChange={(e) => setStatText(e.target.value)}
              placeholder="e.g. Worldwide Country has lots of clients"
              required
            />
          </label>

          <button className="admin-btn admin-btn--primary" type="submit">
            Add Stat Item
          </button>
        </form>
      </div>

      <div className="admin-card">
        <div className="admin-card__title">Current Stat Items</div>

        <div className="admin-table">
          <div className="admin-table__head">
            <div>Stat (Number + Suffix)</div>
            <div>Description Text</div>
            <div>Icon</div>
            <div />
          </div>
          {stats.map((item) => (
            <div className="admin-table__row" key={item._id || item.text}>
              <div style={{ fontWeight: "bold" }}>{item.number}{item.suffix}</div>
              <div>{item.text}</div>
              <div>
                {item.icon ? (
                  <img 
                    src={toAssetUrl(item.icon)} 
                    alt="" 
                    style={{ maxHeight: "32px", maxWidth: "32px", borderRadius: "4px" }} 
                  />
                ) : (
                  <span className="admin-muted">No icon</span>
                )}
              </div>
              <div className="admin-actions">
                {item._id ? (
                  <button className="admin-btn admin-btn--danger" type="button" onClick={() => handleDeleteStatItem(item._id)}>
                    Delete
                  </button>
                ) : (
                  <span className="admin-muted">Save main to get id</span>
                )}
              </div>
            </div>
          ))}
          {stats.length === 0 ? (
            <div style={{ padding: "20px", textAlign: "center" }} className="admin-muted">
              No statistics configured yet.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
