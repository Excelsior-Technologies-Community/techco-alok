import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { AdminLayout } from "../components/AdminLayout";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Better from "../pages/Better";
import Team from "../pages/Team";
import Members from "../pages/Members";
import ContactInfo from "../pages/ContactInfo";
import ContactMessages from "../pages/ContactMessages";
import AboutUs from "../pages/AboutUs";

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="better" element={<Better />} />
          <Route path="team" element={<Team />} />
          <Route path="members" element={<Members />} />
          <Route path="contact-info" element={<ContactInfo />} />
          <Route path="messages" element={<ContactMessages />} />
          <Route path="about-us" element={<AboutUs />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}

