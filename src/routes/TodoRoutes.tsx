import { Route, Routes } from "react-router-dom";

import TodoPage from "../pages/Todo";
import RequireAuth from "../components/RequireAuth";

import { TodoContext } from "../context/TodoContext";
import TodoDetail from "../components/TodoDetail";

const Empty = () => (
    <div className="flex items-center justify-center w-full h-full text-8xl">
        텅
    </div>
);

const TodoRoutes = () => (
    <TodoContext>
        <RequireAuth>
            <Routes>
                <Route path="/" element={<TodoPage />}>
                    <Route index element={<Empty />} />
                    <Route path=":id" element={<TodoDetail />} />
                </Route>
            </Routes>
        </RequireAuth>
    </TodoContext>
);

export default TodoRoutes;
