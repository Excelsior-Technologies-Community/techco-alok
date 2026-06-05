import axios from "axios";

const API_BASE =
  (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000").replace(/\/$/, "");

const API = axios.create({
  baseURL: `${API_BASE}/api`,
});

export const getContactInfo = () => API.get("/contactinfo/info");
export const submitContactMsg = (data) => API.post("/contact/submit", data);
export const getAboutDetails = () => API.get("/aboutus");
export const getServicesDetails = () => API.get("/services");
export const getMembers = () => API.get("/member");
export const getMemberById = (id) => API.get(`/member/${id}`);
export const getTeam = () => API.get("/team");
export const getBetterData = () => API.get("/better");
export const getCareerData = () => API.get("/career");
export const getServicePro = () => API.get("/servicepro");
export const getBlogs = () => API.get("/blogs");
export const getBlogBySlug = (slug) => API.get(`/blogs/slug/${slug}`);
export const getPortfolios = () => API.get("/portfolio");
export const getPortfolioBySlug = (slug) => API.get(`/portfolio/${slug}`);

export const toAssetUrl = (maybePath) => {
  if (!maybePath) return "";
  if (/^https?:\/\//i.test(maybePath)) return maybePath;
  return `${API_BASE}${maybePath.startsWith("/") ? maybePath : `/${maybePath}`}`;
};