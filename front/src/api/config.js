import axios from "axios";

export const BASE_URL = "http://localhost:3000";

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
});

instance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("token");

        if (token !== null) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        console.log("une erreur est survenue:", error);
        return Promise.reject(new Error(error));
    },
);

export default instance;
