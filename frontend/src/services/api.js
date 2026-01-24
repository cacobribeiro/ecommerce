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

export const fetchPlans = () => apiRequest("/api/plans");

export const fetchProfile = (token) =>
  apiRequest("/api/profile", {
    headers: { Authorization: `Bearer ${token}` }
  });

export const fetchBookings = (token) =>
  apiRequest("/api/bookings", {
    headers: { Authorization: `Bearer ${token}` }
  });

export const createBooking = (token, payload) =>
  apiRequest("/api/bookings", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload)
  });

export const cancelBooking = (token, id) =>
  apiRequest(`/api/bookings/${id}/cancel`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }
  });
