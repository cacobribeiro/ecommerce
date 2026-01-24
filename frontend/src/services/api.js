const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const apiRequest = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || "Erro na requisição.");
  }

  return response.json();
};

export const loginRequest = (payload) =>
  apiRequest("/api/login", {
    method: "POST",
    body: JSON.stringify(payload)
  });

export const registerRequest = (payload) =>
  apiRequest("/api/register", {
    method: "POST",
    body: JSON.stringify(payload)
  });

const buildAuthHeaders = (token) => (token ? { Authorization: `Bearer ${token}` } : {});

export const fetchSession = () => apiRequest("/api/session");

export const logoutRequest = () =>
  apiRequest("/api/logout", {
    method: "POST"
  });

export const fetchProfile = (token) =>
  apiRequest("/api/profile", {
    headers: buildAuthHeaders(token)
  });

export const sendPrivateLessonLead = (payload) =>
  apiRequest("/api/private-lessons", {
    method: "POST",
    body: JSON.stringify(payload)
  });

export const sendContactMessage = (payload) =>
  apiRequest("/api/contact", {
    method: "POST",
    body: JSON.stringify(payload)
  });

export const fetchSiteConfig = () => apiRequest("/api/site-config");

export const adminLogin = (payload) =>
  apiRequest("/api/admin/login", {
    method: "POST",
    body: JSON.stringify(payload)
  });

export const fetchAdminSession = () => apiRequest("/api/admin/session");

export const adminLogout = () =>
  apiRequest("/api/admin/logout", {
    method: "POST"
  });

export const fetchAdminAssets = () => apiRequest("/api/admin/assets");

export const updateAsset = (payload) =>
  apiRequest("/api/admin/assets", {
    method: "PUT",
    body: JSON.stringify(payload)
  });

export const updatePricing = (payload) =>
  apiRequest("/api/admin/pricing", {
    method: "PUT",
    body: JSON.stringify(payload)
  });
