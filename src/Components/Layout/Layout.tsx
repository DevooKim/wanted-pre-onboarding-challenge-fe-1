import { Outlet } from "react-router-dom";
import AuthButton from "../AuthButton";

const Layout = () => (
    <div id="container" className="w-full">
        <div
            id="header"
            className="w-full flex justify-between items-center h-12 border-2"
        >
            <div>Wanted Challenge Fe1</div>
            <AuthButton />
        </div>
        <Outlet />
    </div>
);

export default Layout;
