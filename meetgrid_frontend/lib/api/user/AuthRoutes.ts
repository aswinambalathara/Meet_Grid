import axios, { AxiosResponse } from "axios";
import IUser from "@/interfaces/IUser";
import apiURLs from "@/config/apiConfig";
import errorHandler from "@/lib/utility/errorHandler";
const { BASE_URL } = apiURLs;

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api/user/auth`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<{ accessToken: string }>) => {
    if (response.data.accessToken) {
      const auth = JSON.parse(localStorage.getItem("auth") || "{}");
      auth.userToken = response.data.accessToken;
      localStorage.setItem("auth", JSON.stringify(auth));
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const signUpUser = async (user: IUser) => {
  try {
    const response = await axiosInstance.post("/create", user);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/login", { email, password });
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

export const loginOTPEmail = async (email: string) => {
  try {
    const response = await axiosInstance.post("/login/send-otp", { email });
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

export const loginWithOTP = async (otp: string, email: string) => {
  try {
    const response = await axiosInstance.post("/login/validate-otp", {
      otp,
      email,
    });
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

export const resendOTP = async (email: string) => {
  try {
    const response = await axiosInstance.post("/login/resend-otp", { email });
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await axiosInstance.post("/forgot-password", { email });
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

export const validateResetToken = async (token: string) => {
  try {
    const response = await axiosInstance.post(
      "/forgot-password/validate-token",
      { token }
    );
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

export const updateForgotPassword = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.patch("/forgot-password/update", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

export const userLogout = async () => {
  try {
    await axiosInstance.get("/logout");
  } catch (error) {
    errorHandler(error);
  }
};
