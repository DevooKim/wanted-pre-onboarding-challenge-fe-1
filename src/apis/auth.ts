import axios from "axios";
import { AuthResponse, AuthInfo } from "../types/auth";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
});

export const login = async ({
    email,
    password,
}: AuthInfo): Promise<AuthResponse> => {
    const { data } = await axiosInstance({
        url: "/users/login",
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
}: AuthInfo): Promise<AuthResponse> => {
    const { data } = await axiosInstance({
        url: "/users/create",
        method: "POST",
        data: {
            email,
            password,
        },
    });

    return data;
};
