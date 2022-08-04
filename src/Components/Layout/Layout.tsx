import { Outlet } from "react-router-dom";
import AuthButton from "../AuthButton";

const Layout = () => (
    <div id="container">
        <div id="header">
            <div>
                <div>Wanted Challenge Fe1</div>
                <AuthButton />
            </div>
        </div>
        <Outlet />
    </div>
);

export default Layout;
