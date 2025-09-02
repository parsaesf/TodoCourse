import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// اضافه کردن access token به هر request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// هندلینگ خطای 401 (token منقضی شده)
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refresh = localStorage.getItem("refresh");
        if (refresh) {
          const res = await axios.post("http://127.0.0.1:8000/api/auth/refresh/", {
            refresh,
          });
          localStorage.setItem("access", res.data.access);
          // دوباره درخواست قبلی رو بفرست
          originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
          return API(originalRequest);
        }
      } catch (err) {
        console.error("Refresh token expired or invalid");
        // اگر refresh هم باطل شد → logout
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default API;
