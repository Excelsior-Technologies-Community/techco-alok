import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { getAdminProfile, toAssetUrl } from "../api/api";
import {
  clearAdminToken,
  clearAdminUser,
  getAdminUser,
  onAdminUserUpdated,
  setAdminUser,
} from "../auth/storage";
import "../styles/admin.css";

export function AdminLayout() {
  const navigate = useNavigate();
  const [me, setMe] = useState(() => getAdminUser());

  const logout = () => {
    clearAdminToken();
    clearAdminUser();
    navigate("/admin/login", { replace: true });
  };

  useEffect(() => {
    let alive = true;
    getAdminProfile()
      .then((res) => {
        if (!alive) return;
        setMe(res.data);
        setAdminUser(res.data);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    return onAdminUserUpdated(() => {
      setMe(getAdminUser());
    });
  }, []);

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-brand__title">Techco Admin</div>
          <div className="admin-brand__sub">Content manager</div>
        </div>

        <nav className="admin-nav">
          <NavLink to="/admin" end className="admin-nav__link">
            <i className="fa-solid fa-gauge" /> Dashboard
          </NavLink>
          <NavLink to="/admin/better" className="admin-nav__link">
            <i className="fa-solid fa-star" /> Better
          </NavLink>
          <NavLink to="/admin/team" className="admin-nav__link">
            <i className="fa-solid fa-people-group" /> Team
          </NavLink>
          <NavLink to="/admin/members" className="admin-nav__link">
            <i className="fa-solid fa-user" /> Members
          </NavLink>
          <NavLink to="/admin/contact-info" className="admin-nav__link">
            <i className="fa-solid fa-address-book" /> Contact Info
          </NavLink>
          <NavLink to="/admin/messages" className="admin-nav__link">
            <i className="fa-solid fa-envelope" /> Messages
          </NavLink>
        </nav>

        <NavLink to="/admin/profile" className="admin-me">
          <div className="admin-me__avatar">
            {me?.profileImage ? (
              <img src={toAssetUrl(me.profileImage)} alt="" />
            ) : (
              <span className="admin-me__fallback">
                {(me?.name || "A").slice(0, 1).toUpperCase()}
              </span>
            )}
          </div>
          <div className="admin-me__meta">
            <div className="admin-me__name">{me?.name || "Admin"}</div>
            <div className="admin-me__email">{me?.email || ""}</div>
          </div>
        </NavLink>

        <button className="admin-btn admin-btn--ghost" onClick={logout} type="button">
          <i className="fa-solid fa-right-from-bracket" /> Logout
        </button>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}

