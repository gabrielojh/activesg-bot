import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "localhost:5000/", // Replace with your base URL
  timeout: 10000,
});

// Example of a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Attach token or custom headers here
    const token = localStorage.getItem("authToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
