import React, { useEffect, useState } from "react";
import { createMember, updateMember, deleteMember, getMembers, toAssetUrl } from "../api/api";
import "../styles/admin.css";

export default function Members() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const [members, setMembers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    position: "",
    experience: "",
    email: "",
    phone: "",
    skillsDescription: "",
    skills: [],
    educationDescription: "",
    qualifications: [],
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);

  // Helper inputs for array builders
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillPct, setNewSkillPct] = useState("");
  const [newQual, setNewQual] = useState("");

  const load = async () => {
    setError("");
    setOk("");
    setLoading(true);
    try {
      const res = await getMembers();
      const data = res?.data?.data;
      setMembers(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleEdit = (m) => {
    setEditingId(m._id);
    setForm({
      name: m.name || "",
      position: m.position || "",
      experience: m.experience || "",
      email: m.email || "",
      phone: m.phone || "",
      skillsDescription: m.skillsDescription || "",
      skills: m.skills || [],
      educationDescription: m.educationDescription || "",
      qualifications: m.qualifications || [],
      image: m.image || "",
    });
    setImageFile(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({
      name: "",
      position: "",
      experience: "",
      email: "",
      phone: "",
      skillsDescription: "",
      skills: [],
      educationDescription: "",
      qualifications: [],
      image: "",
    });
    setImageFile(null);
    setNewSkillName("");
    setNewSkillPct("");
    setNewQual("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOk("");
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k === "skills" || k === "qualifications") {
          fd.append(k, JSON.stringify(v));
        } else {
          fd.append(k, v);
        }
      });
      if (imageFile) fd.append("image", imageFile);

      if (editingId) {
        await updateMember(editingId, fd);
        setOk("Member updated successfully");
      } else {
        await createMember(fd);
        setOk("Member added successfully");
      }
      cancelEdit();
      await load();
    } catch (e2) {
      setError(e2.response?.data?.message || e2.message);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    setError("");
    setOk("");
    try {
      await deleteMember(id);
      setOk("Member deleted");
      await load();
    } catch (e2) {
      setError(e2.message);
    }
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (!newSkillName.trim() || !newSkillPct) return;
    setForm((prev) => ({
      ...prev,
      skills: [...prev.skills, { name: newSkillName.trim(), percentage: Number(newSkillPct) }],
    }));
    setNewSkillName("");
    setNewSkillPct("");
  };

  const removeSkill = (index) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const addQual = (e) => {
    e.preventDefault();
    if (!newQual.trim()) return;
    setForm((prev) => ({
      ...prev,
      qualifications: [...prev.qualifications, newQual.trim()],
    }));
    setNewQual("");
  };

  const removeQual = (index) => {
    setForm((prev) => ({
      ...prev,
      qualifications: prev.qualifications.filter((_, i) => i !== index),
    }));
  };

  return (
    <div>
      <div className="admin-pagehead">
        <div>
          <h1 className="admin-title">Members</h1>
          <p className="admin-subtitle">Create, edit and manage team members.</p>
        </div>
        <button className="admin-btn admin-btn--ghost" type="button" onClick={load} disabled={loading}>
          Refresh
        </button>
      </div>

      {error ? <div className="admin-alert admin-alert--error">{error}</div> : null}
      {ok ? <div className="admin-alert admin-alert--ok">{ok}</div> : null}

      <form className="admin-card" onSubmit={handleSubmit}>
        <div className="admin-card__title">{editingId ? "Edit Member" : "Add member"}</div>

        <div className="admin-grid admin-grid--2">
          <label className="admin-field">
            <div className="admin-field__label">Name</div>
            <input
              className="admin-input"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              required
            />
          </label>

          <label className="admin-field">
            <div className="admin-field__label">Position</div>
            <input
              className="admin-input"
              value={form.position}
              onChange={(e) => setForm((p) => ({ ...p, position: e.target.value }))}
              required
            />
          </label>
        </div>

        <div className="admin-grid admin-grid--2">
          <label className="admin-field">
            <div className="admin-field__label">Experience</div>
            <input
              className="admin-input"
              value={form.experience}
              onChange={(e) => setForm((p) => ({ ...p, experience: e.target.value }))}
              required
            />
          </label>

          <label className="admin-field">
            <div className="admin-field__label">Email</div>
            <input
              className="admin-input"
              type="email"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              required
            />
          </label>
        </div>

        <div className="admin-grid admin-grid--2">
          <label className="admin-field">
            <div className="admin-field__label">Phone</div>
            <input
              className="admin-input"
              value={form.phone}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              required
            />
          </label>

          <label className="admin-field">
            <div className="admin-field__label">Image</div>
            <input
              className="admin-input"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              required={!editingId}
            />
          </label>
        </div>

        {editingId && !imageFile && form.image && (
          <div className="admin-field">
            <div className="admin-field__label">Current Image</div>
            <img
              src={toAssetUrl(form.image)}
              alt="Current member"
              style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px", border: "1px solid #ddd" }}
            />
          </div>
        )}

        <hr style={{ margin: "24px 0", borderColor: "#eee" }} />

        {/* Professional Skills Section */}
        <div className="admin-card__title">Professional Skills</div>
        <label className="admin-field">
          <div className="admin-field__label">Skills Paragraph Description</div>
          <textarea
            className="admin-input"
            rows="3"
            value={form.skillsDescription}
            onChange={(e) => setForm((p) => ({ ...p, skillsDescription: e.target.value }))}
            placeholder="Describe the member's professional skills..."
          />
        </label>

        <div className="admin-field" style={{ background: "#f9f9f9", padding: "16px", borderRadius: "8px", marginBottom: "16px" }}>
          <div className="admin-field__label">Add Skill Odometer (Percentage)</div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "10px" }}>
            <input
              className="admin-input"
              style={{ flex: 2 }}
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="Skill Name (e.g. Product Development)"
            />
            <input
              className="admin-input"
              style={{ flex: 1 }}
              type="number"
              min="0"
              max="100"
              value={newSkillPct}
              onChange={(e) => setNewSkillPct(e.target.value)}
              placeholder="Percentage (e.g. 95)"
            />
            <button className="admin-btn admin-btn--ghost" type="button" onClick={addSkill}>
              Add
            </button>
          </div>
          {form.skills.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {form.skills.map((s, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "#0044EB",
                    color: "white",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                >
                  {s.name} ({s.percentage}%)
                  <button
                    type="button"
                    onClick={() => removeSkill(i)}
                    style={{ background: "none", border: "none", color: "white", cursor: "pointer", fontWeight: "bold" }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <hr style={{ margin: "24px 0", borderColor: "#eee" }} />

        {/* Education & Qualifications Section */}
        <div className="admin-card__title">Educational Experience & Qualifications</div>
        <label className="admin-field">
          <div className="admin-field__label">Education Paragraph Description</div>
          <textarea
            className="admin-input"
            rows="3"
            value={form.educationDescription}
            onChange={(e) => setForm((p) => ({ ...p, educationDescription: e.target.value }))}
            placeholder="Describe the member's educational background..."
          />
        </label>

        <div className="admin-field" style={{ background: "#f9f9f9", padding: "16px", borderRadius: "8px", marginBottom: "16px" }}>
          <div className="admin-field__label">Add Qualification Item (Bulleted List)</div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "10px" }}>
            <input
              className="admin-input"
              style={{ flex: 1 }}
              value={newQual}
              onChange={(e) => setNewQual(e.target.value)}
              placeholder="Qualification bullet point..."
            />
            <button className="admin-btn admin-btn--ghost" type="button" onClick={addQual}>
              Add
            </button>
          </div>
          {form.qualifications.length > 0 && (
            <ul style={{ paddingLeft: "20px", margin: 0 }}>
              {form.qualifications.map((q, i) => (
                <li key={i} style={{ marginBottom: "6px", fontSize: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{q}</span>
                    <button
                      type="button"
                      onClick={() => removeQual(i)}
                      style={{ background: "none", border: "none", color: "red", cursor: "pointer", fontSize: "12px", marginLeft: "10px" }}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="admin-actions" style={{ marginTop: "24px", display: "flex", gap: "10px" }}>
          <button className="admin-btn admin-btn--primary" type="submit">
            {editingId ? "Update Member" : "Add Member"}
          </button>
          {editingId && (
            <button className="admin-btn admin-btn--ghost" type="button" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="admin-card">
        <div className="admin-card__title">All members</div>
        <div className="admin-table">
          <div className="admin-table__head">
            <div>Name</div>
            <div>Position</div>
            <div>Email</div>
            <div />
          </div>
          {members.map((m) => (
            <div className="admin-table__row" key={m._id}>
              <div className="d-flex align-items-center gap-3">
                {m.image && (
                  <img
                    src={toAssetUrl(m.image)}
                    alt=""
                    style={{ width: "36px", height: "36px", borderRadius: "100%", objectFit: "cover" }}
                  />
                )}
                <span>{m.name}</span>
              </div>
              <div className="admin-muted">{m.position}</div>
              <div className="admin-muted">{m.email}</div>
              <div className="admin-actions">
                <button className="admin-btn admin-btn--ghost" type="button" onClick={() => handleEdit(m)} style={{ marginRight: "8px" }}>
                  Edit
                </button>
                <button className="admin-btn admin-btn--danger" type="button" onClick={() => remove(m._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
