import { Link, Outlet } from "react-router-dom";
import AuthButton from "./AuthButton";

const Layout = () => {
    return (
        <div id="container" className="w-full h-screen overflow-hidden">
            <div id="header" className="justify-between border-2 navbar">
                <div className="flex-1 shrink-0">
                    <div className="text-xl normal-case select-none">
                        Wanted Challenge Fe1
                    </div>
                </div>
                <div className="flex justify-center flex-1 px-6 shrink-0">
                    <div className="flex gap-4">
                        <Link className="text-xl normal-case" to="/">
                            HOME
                        </Link>
                        <Link className="text-xl normal-case" to="/todo">
                            TO DO
                        </Link>
                    </div>
                </div>
                <div className="flex justify-end flex-1">
                    <AuthButton />
                </div>
            </div>
            <div className="p-4" style={{ height: "calc(100vh - 64px)" }}>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
