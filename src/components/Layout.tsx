import { useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AuthButton from "./AuthButton";

const Layout = () => {
    const navigate = useNavigate();

    const onClickLogo = useCallback(() => navigate("/"), []);

    return (
        <div id="container" className="w-full h-screen">
            <div
                id="header"
                className="w-full flex justify-between items-center h-12 border-2"
            >
                <div
                    className="select-none cursor-pointer"
                    onClick={onClickLogo}
                >
                    Wanted Challenge Fe1
                </div>
                <AuthButton />
            </div>
            <Outlet />
        </div>
    );
};

export default Layout;
