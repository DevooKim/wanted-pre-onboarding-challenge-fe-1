import { useNavigate } from "react-router-dom";
import { useTodoStateContext } from "../context/TodoContext";

const TodoList = () => {
    const todolist = useTodoStateContext();
    const navigate = useNavigate();

    const detailHandler = (id: string) => {
        navigate(`../${id}`);
    };

    return (
        <div className="h-full p-3 overflow-auto">
            {todolist.map((v) => (
                <div key={v.id}>
                    <div
                        className="text-center cursor-pointer"
                        onClick={() => detailHandler(v.id)}
                    >
                        {v.title}
                    </div>
                    <div className="my-1 divider" />
                </div>
            ))}
        </div>
    );
};

export default TodoList;
