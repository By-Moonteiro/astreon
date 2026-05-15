import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3333",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post("/auth/refresh");
        // Tenta a requisição original de novo
        return api(originalRequest);
      } catch {
        // Refresh falhou — redireciona pro login
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);
