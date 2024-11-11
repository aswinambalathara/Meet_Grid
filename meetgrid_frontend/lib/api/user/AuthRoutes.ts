import axios ,{AxiosResponse}from "axios";
import IUser from "@/interfaces/IUser";
import apiURLs from "@/config/apiConfig";
const { BASE_URL } = apiURLs;

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api/user/auth`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use((response: AxiosResponse<{accessToken:string}>) => {
  if (response.data.accessToken) {
    const auth = JSON.parse(localStorage.getItem("auth") || "{}");
    auth.userToken = response.data.accessToken;
    localStorage.setItem("auth", JSON.stringify(auth));
  }
  return response;
});

export const signUpUser = async (user: IUser) => {
  const response = await axiosInstance.post("/register", user);
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await axiosInstance.post("/login", { email, password });
  return response.data;
};

export const loginOTPEmail = async (email: string) => {
  const response = await axiosInstance.post("/login_OTP/email", { email });
  return response.data;
};

export const loginWithOTP = async (otp: string) => {
  const response = await axiosInstance.post("/login_OTP/email", { otp });
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await axiosInstance.post("/forgot_password", { email });
  return response.data;
};
