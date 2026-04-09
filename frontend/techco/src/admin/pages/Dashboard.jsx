import React from "react";
import "../styles/admin.css";

export default function Dashboard() {
  return (
    <div>
      <div className="admin-pagehead">
        <div>
          <h1 className="admin-title">Dashboard</h1>
          <p className="admin-subtitle">Manage website content from here.</p>
        </div>
      </div>

      <div className="admin-grid">
        <div className="admin-card">
          <div className="admin-card__title">Better section</div>
          <div className="admin-card__text">
            Heading, subscribe badge text, image and feature cards.
          </div>
        </div>
        <div className="admin-card">
          <div className="admin-card__title">Team section</div>
          <div className="admin-card__text">Heading, description and right image.</div>
        </div>
        <div className="admin-card">
          <div className="admin-card__title">Members</div>
          <div className="admin-card__text">Add/update team members and their details.</div>
        </div>
      </div>
    </div>
  );
}

