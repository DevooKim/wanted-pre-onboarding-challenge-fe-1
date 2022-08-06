import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { AuthContext } from "./context/AuthContext";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
import TodoRoutes from "./routes/TodoRoutes";

const Home = () => <h1>HOME</h1>;

const setScreenSize = () => {
    let vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty("--vh", `${vh}px`);
};

const App = () => {
    setScreenSize();

    return (
        <AuthContext>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />

                    <Route path="/todo*" element={<TodoRoutes />} />
                </Route>
            </Routes>
        </AuthContext>
    );
};

export default App;
