import { useCallback, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { useTodoActionContext } from "../context/TodoContext";
import { Todo } from "../types/todo";
import { Mode } from "./TodoDetail";

function TodoActionButton({
    todo,
    setTodo,
    mode,
    onChangeMode,
}: {
    todo: Todo;
    setTodo: Dispatch<SetStateAction<Todo | undefined>>;
    mode: Mode;
    onChangeMode: (mode: Mode) => void;
}) {
    const { updateTodo, deleteTodo } = useTodoActionContext();
    const navigate = useNavigate();

    const applyHandler = useCallback(async (todo: Todo) => {
        const dummy = {
            id: todo?.id,
            title: "hi1a123asd123dd",
            content: "hello3",
        };
        await updateTodo(dummy);
        setTodo({ ...todo, ...dummy });
        onChangeMode(Mode.read);
    }, []);

    const deleteHandler = useCallback(async (id: string) => {
        await deleteTodo(id);
        navigate("/todo", { replace: true });
    }, []);

    return (
        <div>
            <button
                className="btn btn-sm"
                onClick={() =>
                    mode === Mode.read
                        ? onChangeMode(Mode.edit)
                        : applyHandler(todo)
                }
            >
                {mode === Mode.read ? "업데이트" : "적용"}
            </button>
            <button
                className="btn btn-sm"
                // onClick={() => deleteHandler(todo?.id)}
            >
                삭제
            </button>
        </div>
    );
}

export default TodoActionButton;
