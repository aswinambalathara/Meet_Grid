import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import apiURLs from "@/config/apiConfig";
import handleError from "@/lib/utility/errorHandler";
const { USER_URL } = apiURLs;

const axiosUserInstance = axios.create({
  baseURL: USER_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosUserInstance.interceptors.request.use(
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

axiosUserInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

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

        return axiosUserInstance(originalRequest);
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

export const getUserProfile = async () => {
  try {
    const response = await axiosUserInstance.get('/profile');
    return response.data
  } catch (error) {
    handleError(error);
  }
};
