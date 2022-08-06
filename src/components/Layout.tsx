import { Link, Outlet } from "react-router-dom";
import AuthButton from "./AuthButton";

const Layout = () => {
    return (
        <div id="container" className="w-full h-screen">
            <div id="header" className="justify-between border-2 navbar">
                <div className="shrink-0">
                    <div className="select-none">Wanted Challenge Fe1</div>
                </div>
                <div className="px-6 shrink-0">
                    <div className="flex gap-4">
                        <Link to="/">HOME</Link>
                        <Link to="/todo">TO DO</Link>
                    </div>
                </div>
                <div className="">
                    <AuthButton />
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default Layout;
