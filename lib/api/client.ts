import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { env } from "../config/env";
import { tokenStorage } from "./token-storage";

export const apiClient: AxiosInstance = axios.create({
  baseURL: `${env.api.baseUrl}/${env.api.version}`,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.getAccessToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (env.api.debug) {
      console.log("[API Request]", {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
      });
    }

    return config;
  },
  (error: AxiosError) => {
    if (env.api.debug) {
      console.error("[API Request Error]", error);
    }
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (env.api.debug) {
      console.log("[API Response]", {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }

    if (
      response.data &&
      typeof response.data === "object" &&
      "data" in response.data
    ) {
      return { ...response, data: response.data.data };
    }

    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (env.api.debug) {
      console.error("[API Response Error]", {
        status: error.response?.status,
        url: error.config?.url,
        message: error.message,
        data: error.response?.data,
      });
    }

    const isAuthEndpoint =
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/register");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;

      const refreshToken = tokenStorage.getRefreshToken();

      if (!refreshToken) {
        tokenStorage.clearTokens();
        if (typeof window !== "undefined") {
          window.location.href = "/";
        }
        return Promise.reject(error);
      }

      tokenStorage.clearTokens();
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }

    const errorMessage = extractErrorMessage(error);
    return Promise.reject(new Error(errorMessage));
  }
);

function extractErrorMessage(error: AxiosError): string {
  if (error.response?.data) {
    const data = error.response.data as any;

    if (typeof data === "string") {
      return data;
    }

    if (data.message) {
      if (Array.isArray(data.message)) {
        return data.message.join(", ");
      }
      return data.message;
    }

    if (data.error) {
      return data.error;
    }
  }

  if (error.request && !error.response) {
    return "Network error. Please check your connection.";
  }

  return error.message || "An unexpected error occurred";
}

export function createFormData(data: Record<string, any>): FormData {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value.toString());
      }
    }
  });

  return formData;
}

export default apiClient;
