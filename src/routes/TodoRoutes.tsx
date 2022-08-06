import { Outlet, Route, Routes, useParams } from "react-router-dom";

import TodoPage from "../pages/Todo";
import RequireAuth from "../components/RequireAuth";
import { TodoContext } from "../context/TodoContext";

const Detail = () => {
    const { id } = useParams();

    return <h2>{id}</h2>;
};

const NoDetail = () => <h2>Empty</h2>;
const TodoRoutes = () => (
    <TodoContext>
        <RequireAuth>
            <Routes>
                <Route path="/" element={<TodoPage />}>
                    <Route index element={<NoDetail />} />
                    <Route path=":id" element={<Detail />} />
                </Route>
            </Routes>
        </RequireAuth>
    </TodoContext>
);

export default TodoRoutes;
