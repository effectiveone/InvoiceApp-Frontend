import axios, { AxiosError, AxiosResponse } from "axios";
import { logout } from "./auth";
import { inHTMLData } from "xss-filters";

const apiClient = axios.create({
  baseURL: "http://localhost:5002/api",
  timeout: 1000,
});

apiClient.interceptors.request.use(
  (config) => {
    const userDetails = localStorage.getItem("user");

    if (userDetails) {
      const token = JSON.parse(userDetails).token;
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// public routes

export const login = async (data: {
  mail: string;
  password: string;
}): Promise<
  | AxiosResponse<{ userDetails: any }>
  | { error: boolean; exception: AxiosError }
> => {
  try {
    return await apiClient.post("/auth/login", data);
  } catch (exception: AxiosError) {
    return {
      error: true,
      exception,
    };
  }
};

export const register = async (data: {
  mail: string;
  password: string;
  username: string;
}): Promise<
  | AxiosResponse<{ userDetails: any }>
  | { error: boolean; exception: AxiosError }
> => {
  try {
    return await apiClient.post("/auth/register", data);
  } catch (exception: AxiosError) {
    return {
      error: true,
      exception,
    };
  }
};

// secure routes

const checkResponseCode = (exception: AxiosError | undefined) => {
  const responseCode = exception?.response?.status;

  if (responseCode) {
    (responseCode === 401 || responseCode === 403) && logout();
  }
};

//sanitize links:
export const sanitizedUrl = {
  AllInvoices: inHTMLData("/NewInvoice"),
  Kontrahent: inHTMLData("/Kontrahent"),
  Settings: inHTMLData("/SettingsPage"),
  Dashboard: inHTMLData("/InvoicesIssued"),
  MyCompany: inHTMLData("/Mycompany"),
};
