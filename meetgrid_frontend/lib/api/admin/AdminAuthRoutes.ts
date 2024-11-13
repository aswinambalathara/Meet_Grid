import axios, { AxiosResponse } from "axios";
import IAdmin from "@/interfaces/IAdmin";
import apiURLs from "@/config/apiConfig";
import errorHandler from "@/lib/utility/errorHandler";
const { ADMIN_URL } = apiURLs;

const axiosInstance = axios.create({
  baseURL: `${ADMIN_URL}/auth`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<{ accessToken: string }>) => {
    if (response.data.accessToken) {
      const auth = JSON.parse(localStorage.getItem("auth") || "{}");
      auth.adminToken = response.data.accessToken;
      localStorage.setItem("auth", JSON.stringify(auth));
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const handleAdminLogin = async (admin: IAdmin) => {
  try {
    const response = await axiosInstance.post("/login", admin);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

export const handleAdminLogout = async () => {
    try {
      const response = await axiosInstance.get("/logout");
      return response.data;
    } catch (error) {
      errorHandler(error);
    }
  };
