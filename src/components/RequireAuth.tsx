import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStateContext } from "../context/AuthContext";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    const { isLogin } = useAuthStateContext();

    return <>{isLogin ? children : <Navigate to="/login" />}</>;
};

export default RequireAuth;
