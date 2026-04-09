import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAdminAuthed } from "../auth/storage";

export function ProtectedRoute() {
  if (!isAdminAuthed()) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
}

