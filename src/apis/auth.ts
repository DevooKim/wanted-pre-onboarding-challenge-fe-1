import { AuthResponse, AuthInfo } from "../types/auth";
import { axiosInstance } from "./axiosInstance";

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

    const { token } = data;
    if (token) {
        axiosInstance.defaults.headers.common["Authorization"] = token;
    }
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
