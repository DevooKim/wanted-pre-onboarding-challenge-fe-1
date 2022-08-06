import { Outlet } from "react-router-dom";
import TodoList from "../components/TodoList";

const TodoPage = () => {
    return (
        <div className="flex flex-row w-full ">
            <div className="w-full border">
                <TodoList />
            </div>
            <div className="w-full h-full border">
                <Outlet />
            </div>
        </div>
    );
};

export default TodoPage;
