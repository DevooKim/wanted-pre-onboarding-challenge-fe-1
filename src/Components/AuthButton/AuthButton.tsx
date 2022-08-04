import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
    useAuthActionContext,
    useAuthStateContext,
} from "../../context/AuthContext";

const AuthButton = () => {
    const { isLogin } = useAuthStateContext();
    const { logoutHandler } = useAuthActionContext();
    const navigate = useNavigate();

    const goLogin = useCallback(() => {
        navigate("/login");
    }, []);
    const goSignUp = useCallback(() => {
        navigate("/signup");
    }, []);

    return (
        <>
            {isLogin ? (
                <button onClick={logoutHandler}>logout</button>
            ) : (
                <div>
                    <button onClick={goLogin}>login</button>
                    <button onClick={goSignUp}>signUp</button>
                </div>
            )}
        </>
    );
};

export default AuthButton;
