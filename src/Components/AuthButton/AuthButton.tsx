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
                <button className="btn btn-sm" onClick={logoutHandler}>
                    logout
                </button>
            ) : (
                <div>
                    <button className="btn btn-sm" onClick={goLogin}>
                        login
                    </button>
                    <button className="btn btn-sm" onClick={goSignUp}>
                        signUp
                    </button>
                </div>
            )}
        </>
    );
};

export default AuthButton;
