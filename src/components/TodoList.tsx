import { useNavigate } from "react-router-dom";
import { useTodoStateContext } from "../context/TodoContext";

const TodoList = () => {
    const todolist = useTodoStateContext();
    const navigate = useNavigate();

    const detailHandler = (id: string) => {
        navigate(`../${id}`);
    };

    return (
        <div>
            {todolist.map((v) => (
                <div key={v.id}>
                    <div onClick={() => detailHandler(v.id)}>{v.title}</div>
                </div>
            ))}
        </div>
    );
};

export default TodoList;
