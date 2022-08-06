import { Link, Outlet } from "react-router-dom";
import AuthButton from "./AuthButton";

const Layout = () => {
    return (
        <div id="container" className="w-full min-h-screen">
            <div id="header" className="justify-between border-2 navbar">
                <div className="shrink-0">
                    <div className="text-xl normal-case select-none">
                        Wanted Challenge Fe1
                    </div>
                </div>
                <div className="px-6 shrink-0">
                    <div className="flex gap-4">
                        <Link className="text-xl normal-case" to="/">
                            HOME
                        </Link>
                        <Link className="text-xl normal-case" to="/todo">
                            TO DO
                        </Link>
                    </div>
                </div>
                <div>
                    <AuthButton />
                </div>
            </div>
            <div className="h-full p-4 ">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
