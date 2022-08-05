import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import { AuthContext } from "./context/AuthContext";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";

const Home = () => <h1>HOME</h1>;
const Login = () => <h1>Login</h1>;
const Todo = () => <h1>Todo</h1>;

const App = () => (
    <AuthContext>
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />

                <Route
                    path="/todo"
                    element={
                        <RequireAuth>
                            <Todo />
                        </RequireAuth>
                    }
                />
            </Route>
        </Routes>
    </AuthContext>
);

export default App;
