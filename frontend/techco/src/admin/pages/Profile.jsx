import React, { useEffect, useState } from "react";
import { api, toAssetUrl } from "../api/client";
import { getAdminUser, setAdminUser } from "../auth/storage";
import "../styles/admin.css";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const [me, setMe] = useState(() => getAdminUser());
  const [name, setName] = useState(me?.name || "");
  const [email, setEmail] = useState(me?.email || "");
  const [imageFile, setImageFile] = useState(null);

  const load = async () => {
    setError("");
    setOk("");
    setLoading(true);
    try {
      const res = await api.get("/api/admin/profile");
      setMe(res);
      setAdminUser(res);
      setName(res?.name || "");
      setEmail(res?.email || "");
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
      fd.append("name", name);
      fd.append("email", email);
      if (imageFile) fd.append("image", imageFile);

      const res = await api.putForm("/api/admin/update", fd);
      const user = res?.user || res?.data?.user;
      if (user) {
        setMe(user);
        setAdminUser(user);
      }
      setOk("Profile updated");
      setImageFile(null);
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
          <h1 className="admin-title">Profile</h1>
          <p className="admin-subtitle">Update your name, email and profile image.</p>
        </div>
        <button className="admin-btn admin-btn--ghost" type="button" onClick={load} disabled={loading}>
          Refresh
        </button>
      </div>

      {error ? <div className="admin-alert admin-alert--error">{error}</div> : null}
      {ok ? <div className="admin-alert admin-alert--ok">{ok}</div> : null}

      <div className="admin-card">
        <div className="admin-profile">
          <div className="admin-profile__avatar">
            {me?.profileImage ? (
              <img src={toAssetUrl(me.profileImage)} alt="" />
            ) : (
              <span className="admin-me__fallback">{(me?.name || "A").slice(0, 1).toUpperCase()}</span>
            )}
          </div>
          <div className="admin-profile__meta">
            <div className="admin-card__title">{me?.name || "Admin"}</div>
            <div className="admin-muted">{me?.email || ""}</div>
          </div>
        </div>
      </div>

      <form className="admin-card" onSubmit={save}>
        <div className="admin-card__title">Edit profile</div>

        <div className="admin-grid admin-grid--2">
          <label className="admin-field">
            <div className="admin-field__label">Name</div>
            <input className="admin-input" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label className="admin-field">
            <div className="admin-field__label">Email</div>
            <input className="admin-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
        </div>

        <label className="admin-field">
          <div className="admin-field__label">Profile image</div>
          <input className="admin-input" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
        </label>

        <button className="admin-btn admin-btn--primary" type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
}

