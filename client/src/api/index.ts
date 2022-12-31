import axios from "axios";
import toast from "react-hot-toast";

const API = axios.create({
  baseURL: "http://192.168.22.8:8080/",
});

function getUserLocalStorage() {
  const user = localStorage.getItem("user");
  return user ? `Bearer ${JSON.parse(user).token}` : null;
}

API.interceptors.request.use(function (config) {
  const token = getUserLocalStorage();
  if (config.headers) config.headers.Authorization = token;

  return config;
});

API.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("user");
      window.location.replace("/login");
    }

    toast.error("İşlem sırasında bir hata meydana geldi!");
    return Promise.reject(error);
  }
);

export { API };
