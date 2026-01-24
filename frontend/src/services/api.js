const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const apiRequest = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
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

export const fetchProfile = (token) =>
  apiRequest("/api/profile", {
    headers: { Authorization: `Bearer ${token}` }
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

const encodeAdminCredentials = ({ login, password }) =>
  `Basic ${btoa(`${login}:${password}`)}`;

export const fetchAdminAssets = (credentials) =>
  apiRequest("/api/admin/assets", {
    headers: { Authorization: encodeAdminCredentials(credentials) }
  });

export const updateAsset = (credentials, payload) =>
  apiRequest("/api/admin/assets", {
    method: "PUT",
    headers: { Authorization: encodeAdminCredentials(credentials) },
    body: JSON.stringify(payload)
  });

export const updatePricing = (credentials, payload) =>
  apiRequest("/api/admin/pricing", {
    method: "PUT",
    headers: { Authorization: encodeAdminCredentials(credentials) },
    body: JSON.stringify(payload)
  });
