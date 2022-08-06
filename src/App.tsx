import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
import TodoRoutes from "./routes/TodoRoutes";

const App = () => (
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

export default App;
