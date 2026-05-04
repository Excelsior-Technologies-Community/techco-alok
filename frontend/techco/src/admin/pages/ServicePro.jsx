import React, { useEffect, useState } from "react";
import { getAdminServicePro, upsertServicePro } from "../api/api";
import "../styles/admin.css";

export default function ServicePro() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState({ heading: "", paragraph: "" });
  const [editingIndex, setEditingIndex] = useState(null);

  const load = async () => {
    setError("");
    setOk("");
    setLoading(true);
    try {
      const res = await getAdminServicePro();
      const data = res?.data?.data;
      if (data) {
        setSections(Array.isArray(data) ? data : []);
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

  const addOrUpdateSection = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updated = [...sections];
      updated[editingIndex] = newSection;
      setSections(updated);
      setEditingIndex(null);
    } else {
      setSections([...sections, newSection]);
    }
    setNewSection({ heading: "", paragraph: "" });
  };

  const deleteSection = (index) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const editSection = (index) => {
    setNewSection(sections[index]);
    setEditingIndex(index);
  };

  const saveAll = async () => {
    setError("");
    setOk("");
    setSaving(true);
    try {
      await upsertServicePro({ sections });
      setOk("Service Process updated successfully");
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="admin-pagehead">
        <div>
          <h1 className="admin-title">Service Process</h1>
          <p className="admin-subtitle">Manage the process steps shown on the Careers/Services page.</p>
        </div>
        <button className="admin-btn admin-btn--ghost" type="button" onClick={load} disabled={loading}>
          Refresh
        </button>
      </div>

      {error ? <div className="admin-alert admin-alert--error">{error}</div> : null}
      {ok ? <div className="admin-alert admin-alert--ok">{ok}</div> : null}

      <div className="admin-card">
        <div className="admin-card__title">{editingIndex !== null ? "Edit Step" : "Add New Step"}</div>
        <form onSubmit={addOrUpdateSection} className="admin-grid admin-grid--2">
          <label className="admin-field">
            <div className="admin-field__label">Heading</div>
            <input
              className="admin-input"
              value={newSection.heading}
              onChange={(e) => setNewSection({ ...newSection, heading: e.target.value })}
              placeholder="e.g. Listening to Your Needs"
              required
            />
          </label>
          <label className="admin-field">
            <div className="admin-field__label">Description</div>
            <textarea
              className="admin-input"
              rows={3}
              value={newSection.paragraph}
              onChange={(e) => setNewSection({ ...newSection, paragraph: e.target.value })}
              placeholder="Step description..."
              required
            />
          </label>
          <div className="admin-field" style={{ gridColumn: "span 2" }}>
            <button className="admin-btn admin-btn--primary" type="submit">
              {editingIndex !== null ? "Update Step" : "Add Step"}
            </button>
            {editingIndex !== null && (
              <button 
                className="admin-btn admin-btn--ghost" 
                type="button" 
                onClick={() => { setEditingIndex(null); setNewSection({ heading: "", paragraph: "" }); }}
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="admin-card">
        <div className="admin-card__title">Current Steps</div>
        <div className="admin-table">
          <div className="admin-table__head">
            <div>Order</div>
            <div>Heading</div>
            <div>Description</div>
            <div />
          </div>
          {sections.map((s, i) => (
            <div className="admin-table__row" key={i}>
              <div>{i + 1}</div>
              <div style={{ fontWeight: 600 }}>{s.heading}</div>
              <div className="admin-muted">{s.paragraph.substring(0, 50)}...</div>
              <div className="admin-actions">
                <button className="admin-btn admin-btn--ghost" onClick={() => editSection(i)}>Edit</button>
                <button className="admin-btn admin-btn--danger" onClick={() => deleteSection(i)}>Delete</button>
              </div>
            </div>
          ))}
          {sections.length === 0 && <div style={{ padding: "20px", textAlign: "center" }}>No steps added yet.</div>}
        </div>

        {sections.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <button className="admin-btn admin-btn--primary" onClick={saveAll} disabled={saving}>
              {saving ? "Saving Changes..." : "Save All to Database"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
