import axios from "axios";

const API_BASE =
  (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000").replace(/\/$/, "");

const TOKEN_KEY = "adminToken";
const LEGACY_TOKEN_KEY = "techco_admin_token";

const API = axios.create({
  baseURL: `${API_BASE}/api`,
});

API.interceptors.request.use((req) => {
  const token =
    localStorage.getItem(TOKEN_KEY) || localStorage.getItem(LEGACY_TOKEN_KEY);
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// ---------- admin ----------
export const loginAdmin = (data) => API.post("/admin/login", data);
export const getAdminProfile = () => API.get("/admin/profile");
export const updateAdminProfile = (formData) =>
  API.put("/admin/update", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ---------- better ----------
export const getBetter = () => API.get("/better");
export const upsertBetter = (formData) =>
  API.post("/better/admin", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const addBetterFeature = (formData) =>
  API.post("/better/admin/feature", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateBetterFeature = (featureId, formData) =>
  API.put(`/better/admin/feature/${featureId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteBetterFeature = (featureId) =>
  API.delete(`/better/admin/feature/${featureId}`);

// ---------- team ----------
export const getTeam = () => API.get("/team");
export const upsertTeam = (formData) =>
  API.post("/team/admin", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ---------- member ----------
export const getMembers = () => API.get("/member");
export const createMember = (formData) =>
  API.post("/member/admin", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateMember = (id, formData) =>
  API.put(`/member/admin/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteMember = (id) => API.delete(`/member/admin/${id}`);

export const toAssetUrl = (maybePath) => {
  if (!maybePath) return "";
  if (/^https?:\/\//i.test(maybePath)) return maybePath;
  return `${API_BASE}${maybePath.startsWith("/") ? maybePath : `/${maybePath}`}`;
};
