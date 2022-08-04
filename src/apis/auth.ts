import axios from "axios";
import { AuthResponse, LoginInfo } from "../types/auth";

const axiosInstance = axios.create({
    baseURL: "https://localhost:8080",
});

export const login = async ({
    email,
    password,
}: LoginInfo): Promise<AuthResponse> => {
    const { data } = await axiosInstance({
        url: "/login",
        method: "POST",
        data: {
            email,
            password,
        },
    });

    return data;
};

export const signUp = async ({
    email,
    password,
}: LoginInfo): Promise<AuthResponse> => {
    const { data } = await axiosInstance({
        url: "/create",
        method: "POST",
        data: {
            email,
            password,
        },
    });

    return data;
};
