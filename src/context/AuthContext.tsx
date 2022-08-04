import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { login, signUp } from "../apis/auth";
import useLocalStorage from "../hooks/useLocalStorage";
import { AuthInfo } from "../types/auth";

interface IStateContext {
    isLogin: boolean;
    loading: boolean;
}

interface IActionContext {
    loginHandler: (auth: AuthInfo) => void;
    logoutHandler: () => void;
    signUpHandler: (auth: AuthInfo) => void;
}

const defaultState = {
    isLogin: false,
    loading: false,
};

const defaultActionState = {
    loginHandler: () => {},
    logoutHandler: () => {},
    signUpHandler: () => {},
};

const AuthStateContextProvider = createContext<IStateContext>(defaultState);
const AuthActionContextProvider =
    createContext<IActionContext>(defaultActionState);

export const useAuthStateContext = () => useContext(AuthStateContextProvider);
export const useAuthActionContext = () => useContext(AuthActionContextProvider);

export const AuthContext = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(false);
    const [token, setToken, deleteValue] = useLocalStorage<string | undefined>(
        "loginToken",
        undefined
    );
    const navigate = useNavigate();

    const isLogin = useMemo(() => Boolean(token), [token]);

    const loginHandler = useCallback(async ({ email, password }: AuthInfo) => {
        setLoading(true);
        const { token: newToken } = await login({ email, password });
        setToken(newToken);
        setLoading(false);
    }, []);

    const logoutHandler = useCallback(() => {
        deleteValue();
        navigate("/");
    }, []);

    const signUpHandler = useCallback(async ({ email, password }: AuthInfo) => {
        setLoading(true);
        const { token: newToken } = await signUp({ email, password });
        setToken(newToken);
        setLoading(false);
    }, []);

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
