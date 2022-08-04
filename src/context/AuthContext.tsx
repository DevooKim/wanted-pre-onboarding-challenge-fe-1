import React, { createContext, useCallback, useMemo, useState } from "react";
import { login, signUp } from "../apis/auth";
import useLocalStorage from "../hooks/useLocalStorage";
import { AuthInfo } from "../types/auth";

const AuthStateContextProvider = createContext({});
const AuthActionContextProvider = createContext({});

interface AuthContextProps {
    children: React.ReactNode;
}

const AuthContext = ({ children }: AuthContextProps) => {
    const [loading, setLoading] = useState(false);
    const [token, setToken, deleteValue] = useLocalStorage<string | undefined>(
        "loginToken",
        undefined
    );

    const isLogin = useMemo(() => Boolean(token), [token]);

    const loginHandler = useCallback(async ({ email, password }: AuthInfo) => {
        setLoading(true);
        const { token: newToken } = await login({ email, password });
        setToken(newToken);
        setLoading(false);
    }, []);

    const logoutHandler = useCallback(() => deleteValue(), []);

    const signUpHandler = useCallback(
        async ({ email, password }: AuthInfo) => {
            setLoading(true);
            const { token: newToken } = await signUp({ email, password });
            setToken(newToken);
            setLoading(false);
        },
        []
    );

    return (
        <AuthStateContextProvider.Provider value={{ isLogin, loading }}>
            <AuthActionContextProvider.Provider
                value={{ loginHandler, logoutHandler, signUpHandler }}
            >
                {children}
            </AuthActionContextProvider.Provider>
        </AuthStateContextProvider.Provider>
    );
};

export default AuthContext;
