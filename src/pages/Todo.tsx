import { Outlet } from "react-router-dom";
import TodoCreate from "../components/TodoCreate";
import TodoList from "../components/TodoList";

const TodoPage = () => {
    return (
        <div className="flex flex-row w-full">
            <div className="w-full border grow">
                <div>
                    <TodoCreate />
                    <TodoList />
                </div>
            </div>
            <div className="w-full border grow">
                <Outlet />
            </div>
        </div>
    );
};

export default TodoPage;
