import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import apiURLs from "@/config/apiConfig";
import handleError from "@/lib/utility/errorHandler";
import { ErrorResponse } from "@/lib/utility/types";
import ITicket from "@/interfaces/ITicket";
const { TICKETS_URL, USER_URL } = apiURLs;

const axiosTicketInstance = axios.create({
  baseURL: TICKETS_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosTicketInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("auth") || "{}");
    if (token.userToken) {
      config.headers.Authorization = `Bearer ${token.userToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

axiosTicketInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 403) {
      const responseData = error.response.data as ErrorResponse;
      console.log(responseData);
      if (responseData.isBlocked === true) {
        try {
          const tokens = JSON.parse(localStorage.getItem("auth") || "{}");
          await axios.get(`${USER_URL}/auth/logout`);
          localStorage.setItem(
            "auth",
            JSON.stringify({
              ...tokens,
              userToken: "",
            })
          );
        } catch (err) {
          handleError(err);
        } finally {
          window.location.href = "/auth/login?error=User Blocked";
        }
      }
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const tokens = JSON.parse(localStorage.getItem("auth") || "{}");
        const refreshResponse = await axios.get(`${USER_URL}/auth/refresh`, {
          withCredentials: true,
        });

        const newAccessToken = refreshResponse.data.accessToken;

        localStorage.setItem(
          "auth",
          JSON.stringify({
            ...tokens,
            userToken: newAccessToken,
          })
        );

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosTicketInstance(originalRequest);
      } catch (refreshError: unknown) {
        if (
          refreshError instanceof AxiosError &&
          refreshError.response?.status === 401
        ) {
          const tokens = JSON.parse(localStorage.getItem("auth") || "{}");
          localStorage.setItem("auth", {
            ...tokens,
            userToken: "",
          });
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const checkout = async (ticketData: ITicket) => {
  try {
    const response = await axiosTicketInstance.post("/checkout", ticketData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
