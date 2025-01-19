import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import apiURLs from "@/config/apiConfig";
import handleError from "@/lib/utility/errorHandler";
import { ErrorResponse, ProfilePasswordFormData } from "@/lib/utility/types";
import IUser from "@/interfaces/IUser";

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

    if (error.response?.status === 403) {
      const responseData = error.response.data as ErrorResponse;

      if (responseData.isBlocked) {
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
        }finally{
          window.location.href = '/auth/login?error=User Blocked'
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
    const response = await axiosUserInstance.get("/profile");
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const sendEmailVerification = async (email: string) => {
  try {
    const response = await axiosUserInstance.post(
      "/profile/basic-details/send-mail",
      { email }
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const verifyEmailOTP = async (otp: string) => {
  try {
    const response = await axiosUserInstance.post(
      "/profile/basic-details/verify-email",
      { otp }
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const updateBasicDetails = async (formData: Partial<IUser>) => {
  try {
    const response = await axiosUserInstance.patch(
      "/profile/basic-details",
      formData
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const updateProfileImage = async ({
  imageURL,
  public_id,
}: {
  imageURL: string;
  public_id: string;
}) => {
  try {
    const response = await axiosUserInstance.patch(
      "/profile/basic-details/upload-image",
      { imageURL, public_id }
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const updateProfessionalDetails = async (
  formData: IUser["professionalInfo"]
) => {
  try {
    const response = await axiosUserInstance.patch(
      "/profile/professional-details",
      formData
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const changePasswordSendOTP = async () => {
  try {
    const response = await axiosUserInstance.get(
      "/profile/change-password/send-otp"
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const verifyChangePasswordOTP = async (otp: number) => {
  try {
    const response = await axiosUserInstance.post(
      "/profile/change-password/verify-otp",
      { otp }
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const changePassword = async (data: ProfilePasswordFormData) => {
  try {
    const response = await axiosUserInstance.patch(
      "/profile/change-password",
      data
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const deactivateAccount = async (password: string) => {
  try {
    const response = await axiosUserInstance.patch(
      "/profile/deactivate-account",
      { password }
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};
