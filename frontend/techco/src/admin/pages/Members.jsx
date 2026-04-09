import React, { useEffect, useState } from "react";
import { api } from "../api/client";
import "../styles/admin.css";

export default function Members() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const [members, setMembers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    position: "",
    experience: "",
    email: "",
    phone: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const load = async () => {
    setError("");
    setOk("");
    setLoading(true);
    try {
      const res = await api.get("/api/member");
      const data = res?.data || res;
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

  const create = async (e) => {
    e.preventDefault();
    setError("");
    setOk("");
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (imageFile) fd.append("image", imageFile);

      await api.postForm("/api/member/admin", fd);
      setOk("Member added");
      setForm({
        name: "",
        position: "",
        experience: "",
        email: "",
        phone: "",
      });
      setImageFile(null);
      await load();
    } catch (e2) {
      setError(e2.message);
    }
  };

  const remove = async (id) => {
    setError("");
    setOk("");
    try {
      await api.delete(`/api/member/admin/${id}`);
      setOk("Member deleted");
      await load();
    } catch (e2) {
      setError(e2.message);
    }
  };

  return (
    <div>
      <div className="admin-pagehead">
        <div>
          <h1 className="admin-title">Members</h1>
          <p className="admin-subtitle">Create and manage members list.</p>
        </div>
        <button className="admin-btn admin-btn--ghost" type="button" onClick={load} disabled={loading}>
          Refresh
        </button>
      </div>

      {error ? <div className="admin-alert admin-alert--error">{error}</div> : null}
      {ok ? <div className="admin-alert admin-alert--ok">{ok}</div> : null}

      <form className="admin-card" onSubmit={create}>
        <div className="admin-card__title">Add member</div>

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
            <input className="admin-input" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} required />
          </label>
        </div>

        <button className="admin-btn admin-btn--primary" type="submit">
          Add
        </button>
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
              <div>{m.name}</div>
              <div className="admin-muted">{m.position}</div>
              <div className="admin-muted">{m.email}</div>
              <div className="admin-actions">
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

