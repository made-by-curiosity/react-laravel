import axios from "axios";
import { localStorageManager } from "./localStorageManager";
import { USER_LOG_IN_ROUTE, USER_REGISTER_ROUTE } from "../api/constants";

const urlSkipAuth = [
    USER_LOG_IN_ROUTE,
    USER_REGISTER_ROUTE,
];

const apiPort = import.meta.env.VITE_API_PORT || 8811;
const baseURL = `http://localhost:${apiPort}/api`;

// Create basic configuration for request.
const apiClient = axios.create({
    baseURL,
});

// Set required authorization header for requests.
apiClient.interceptors.request.use((config: any) => {
    if (
        config.url &&
        config.method === "post" &&
        urlSkipAuth.includes(config.url)
    ) {
        return config;
    }

    const token = localStorageManager.getToken();
    config.headers.Authorization = `Bearer ${token}`;

    return config;
});

export { apiClient };
