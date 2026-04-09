import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { setAdminToken, setAdminUser } from "../auth/storage";
import "../styles/admin.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.postJson("/api/admin/login", { email, password });
      const token = res?.token || res?.data?.token;
      if (!token) throw new Error("Token not received from server");
      setAdminToken(token);
      if (res?.user) setAdminUser(res.user);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-auth">
      <form className="admin-card admin-auth__card" onSubmit={submit}>
        <div className="admin-auth__title">Admin Login</div>
        <div className="admin-auth__sub">Use your admin credentials</div>

        <label className="admin-field">
          <div className="admin-field__label">Email</div>
          <input
            className="admin-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            required
          />
        </label>

        <label className="admin-field">
          <div className="admin-field__label">Password</div>
          <input
            className="admin-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </label>

        {error ? <div className="admin-alert admin-alert--error">{error}</div> : null}

        <button className="admin-btn admin-btn--primary" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <div className="admin-hint">
          API base: <code>{import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}</code>
        </div>
      </form>
    </div>
  );
}

