import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import apiURLs from "@/config/apiConfig";
import handleError from "@/lib/utility/errorHandler";
const { ADMIN_URL } = apiURLs;

 const adminAxiosInstance = axios.create({
  baseURL: `${ADMIN_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

adminAxiosInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("auth") || "{}");
    if (token.adminToken) {
      config.headers.Authorization = `Bearer ${token.adminToken}`;
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

adminAxiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const tokens = JSON.parse(localStorage.getItem("auth") || "{}");
        const refreshResponse = await axios.get(`${ADMIN_URL}/auth/refresh`, {
          withCredentials: true,
        });

        const newAccessToken = refreshResponse.data.accessToken;

        localStorage.setItem(
          "auth",
          JSON.stringify({
            ...tokens,
            adminToken: newAccessToken,
          })
        );

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return adminAxiosInstance(originalRequest);
      } catch (refreshError: unknown) {
        if (
          refreshError instanceof AxiosError &&
          refreshError.response?.status === 401
        ) {
          const tokens = JSON.parse(localStorage.getItem("auth") || "{}");
          localStorage.setItem("auth", {
            ...tokens,
            adminToken: "",
          });
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const getUsers = async (
  offset: number,
  limit: number,
  searchTerm?: string
) => {
  try {
    const response = await adminAxiosInstance.get(
      `/users?limit=${limit}&offset=${offset}&searchTerm=${searchTerm}`
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getUser = async (id: string) => {
  try {
    const response = await adminAxiosInstance.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const blockOrUnblockUser = async (id: string, isBlocked: boolean) => {
  try {
    const response = await adminAxiosInstance.patch("/users/block", {
      id,
      isBlocked,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const changeAccountStatus = async (
  id: string,
  isDeactivated: boolean
) => {
  try {
    const response = await adminAxiosInstance.patch("/users/activation", {
      id,
      isDeactivated,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const adminLogout = async () => {
  try {
    const response = await adminAxiosInstance.get("/auth/logout");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export default adminAxiosInstance