import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
});

axiosInstance.interceptors.request.use(
    (req: AxiosRequestConfig): AxiosRequestConfig => {
        const token = window.localStorage.getItem("loginToken");
        if (token) {
            req.headers.Authorization = token;
        }

        return req;
    }
);

export default axiosInstance
