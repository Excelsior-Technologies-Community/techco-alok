import React, { useEffect, useState } from "react";
import {
  createContactInfo,
  deleteContactInfo,
  getContactInfo,
  updateContactInfo,
  toAssetUrl,
} from "../api/api";
import "../styles/admin.css";

export default function ContactInfo() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  
  const [infos, setInfos] = useState([]);

  const [form, setForm] = useState({
    heading: "",
    para: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    setError("");
    setOk("");
    setLoading(true);
    try {
      const res = await getContactInfo();
      const data = res?.data?.data;
      setInfos(Array.isArray(data) ? data : []);
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
      fd.append("heading", form.heading);
      fd.append("para", form.para);
      
      if (imageFile) {
        fd.append("image", imageFile);
      } else if (editingId) {
        const existingInfo = infos.find((i) => i._id === editingId);
        if (existingInfo && existingInfo.image) {
           fd.append("image", existingInfo.image);
        }
      }

      if (editingId) {
        await updateContactInfo(editingId, fd);
        setOk("Updated successfully");
      } else {
        await createContactInfo(fd);
        setOk("Added successfully");
      }
      
      setForm({ heading: "", para: "" });
      setImageFile(null);
      setEditingId(null);
      await load();
    } catch (e2) {
      setError(e2.message || "Error saving contact info");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this option?")) return;
    setError("");
    setOk("");
    try {
      await deleteContactInfo(id);
      setOk("Deleted successfully");
      if (editingId === id) cancelEdit();
      await load();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleEdit = (info) => {
    setEditingId(info._id);
    setForm({
      heading: info.heading || "",
      para: info.para || "",
    });
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ heading: "", para: "" });
    setImageFile(null);
  };

  return (
    <div>
      <div className="admin-pagehead">
        <div>
          <h1 className="admin-title">Contact Info</h1>
          <p className="admin-subtitle">Add or edit contact options (like Location, Email, Phone).</p>
        </div>
        <button className="admin-btn admin-btn--ghost" type="button" onClick={load} disabled={loading}>
          Refresh
        </button>
      </div>

      {error ? <div className="admin-alert admin-alert--error">{error}</div> : null}
      {ok ? <div className="admin-alert admin-alert--ok">{ok}</div> : null}

      <form className="admin-card" onSubmit={save}>
        <div className="admin-card__title">
           {editingId ? "Edit info option" : "Add new info option"}
        </div>
        
        <div className="admin-grid admin-grid--2">
          <label className="admin-field">
            <div className="admin-field__label">Heading</div>
            <input
              className="admin-input"
              value={form.heading}
              onChange={(e) => setForm((p) => ({ ...p, heading: e.target.value }))}
              required
              placeholder="e.g. Location"
            />
          </label>
           <label className="admin-field">
            <div className="admin-field__label">Icon / Image</div>
            <input 
              className="admin-input" 
              type="file" 
              accept="image/*" 
              onChange={(e) => setImageFile(e.target.files?.[0] || null)} 
              required={!editingId} 
            />
            {editingId && <div className="admin-hint">Leave blank to keep current image.</div>}
          </label>
        </div>

        <label className="admin-field">
          <div className="admin-field__label">Paragraph Details</div>
          <textarea
            className="admin-input admin-textarea"
            value={form.para}
            onChange={(e) => setForm((p) => ({ ...p, para: e.target.value }))}
            required
            placeholder="Sunshine Business Park Sector-94..."
          />
        </label>

        <div className="admin-actions" style={{ gap: "10px", justifyContent: "flex-start" }}>
          <button className="admin-btn admin-btn--primary" type="submit" disabled={saving}>
            {saving ? "Saving..." : editingId ? "Save Changes" : "Add Content Option"}
          </button>
          {editingId && (
            <button className="admin-btn" type="button" onClick={cancelEdit} disabled={saving}>
              Cancel
            </button>
          )}
        </div>
      </form>
      
      <div className="admin-card">
        <div className="admin-card__title">All Info Cards</div>
        <div className="admin-table">
          <div className="admin-table__head" style={{ gridTemplateColumns: "1fr 2fr 1fr auto" }}>
            <div>Heading</div>
            <div>Paragraph</div>
            <div>Image</div>
            <div />
          </div>
          {infos.map((info) => (
            <div className="admin-table__row" style={{ gridTemplateColumns: "1fr 2fr 1fr auto" }} key={info._id}>
              <div style={{ fontWeight: 700 }}>{info.heading}</div>
              <div className="admin-muted" style={{ whiteSpace: "pre-wrap", fontSize: "14px" }}>{info.para}</div>
              <div className="admin-muted">
                {info.image && (
                   <img src={toAssetUrl(`/uploads/contact/${info.image}`)} alt="" style={{ height: "40px", objectFit: "contain" }} />
                )}
              </div>
              <div className="admin-actions" style={{ gap: "8px" }}>
                <button className="admin-btn admin-btn--ghost" type="button" onClick={() => handleEdit(info)} style={{ color: "#0044eb", borderColor: "#0044eb" }}>
                  Edit
                </button>
                <button className="admin-btn admin-btn--danger" type="button" onClick={() => remove(info._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
          {infos.length === 0 && (
             <div style={{ padding: "10px", textAlign: "center", color: "gray" }}>No options added.</div>
          )}
        </div>
      </div>
    </div>
  );
}
