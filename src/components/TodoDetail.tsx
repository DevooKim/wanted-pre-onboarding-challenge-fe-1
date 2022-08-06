import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTodoActionContext } from "../context/TodoContext";
import useDidMountEffect from "../hooks/useDidMountEffect";
import TodoActionButton from "./TodoActionButton";
import { Todo } from "../types/todo";

export enum Mode {
    "read",
    "edit",
}

const TodoDetail = () => {
    const { getTodo } = useTodoActionContext();
    const { id } = useParams();
    const [todo, setTodo] = useState<Todo | undefined>();
    const [mode, setMode] = useState<Mode>(Mode.read);

    useDidMountEffect(() => {
        const fetchTodo = async (id: string) => {
            const data = await getTodo(id);
            if (data) {
                setTodo(data);
            }
        };
        if (id) {
            fetchTodo(id);
        }
    }, [id]);

    const onChangeMode = useCallback((mode: Mode) => setMode(mode), []);

    if (!todo) {
        return null;
    }

    return (
        <div>
            <div>title: {todo?.title}</div>
            <div>content: {todo?.content}</div>
            <TodoActionButton todo={todo} setTodo={setTodo} mode={mode} onChangeMode={onChangeMode}/>
        </div>
    );
};

export default TodoDetail;
