import { useCallback, Dispatch, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
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
    const { getValues, reset } = useFormContext();

    const applyHandler = useCallback(async (todo: Todo) => {
        const updateValue = {
            id: todo?.id,
            title: getValues("title"),
            content: getValues("content"),
        };
        await updateTodo(updateValue);
        setTodo({ ...todo, ...updateValue });
        onChangeMode(Mode.read);
    }, []);

    const deleteHandler = useCallback(async (id: string) => {
        await deleteTodo(id);
        navigate("/todo", { replace: true });
    }, []);

    const cancelHandler = useCallback(() => {
        reset();
        onChangeMode(Mode.read);
    }, []);

    return (
        <div className="flex w-full gap-4">
            <button
                className="flex-1 btn btn-sm"
                onClick={() =>
                    mode === Mode.read
                        ? onChangeMode(Mode.edit)
                        : applyHandler(todo)
                }
            >
                {mode === Mode.read ? "수정" : "적용"}
            </button>
            <button
                className="flex-1 btn btn-sm"
                onClick={() =>
                    mode === Mode.read
                        ? deleteHandler(todo?.id)
                        : cancelHandler()
                }
            >
                {mode === Mode.read ? "삭제" : "취소"}
            </button>
        </div>
    );
}

export default TodoActionButton;
