import React, { createContext, useCallback, useContext, useState } from "react";

import { Todo, TodoInput } from "../types/todo";
import todoApi from "../apis/todo";
import useDidMountEffect from "../hooks/useDidMountEffect";

interface IActionContext {
    getTodoList: () => Promise<Todo[]> | void;
    getTodo: (id: string) => Promise<Todo> | void;
    createTodo: (todo: TodoInput) => void;
    updateTodo: (todo: Pick<Todo, "id" | "title" | "content">) => void;
    deleteTodo: (id: string) => void;
}

const defaultActionState = {
    getTodoList: () => {},
    getTodo: () => {},
    createTodo: () => {},
    updateTodo: () => {},
    deleteTodo: () => {},
};

const TodoStateContext = createContext<Todo[]>([]);
const TodoActionContext = createContext<IActionContext>(defaultActionState);

export const useTodoStateContext = () => useContext(TodoStateContext);
export const useTodoActionContext = () => useContext(TodoActionContext);

export const TodoContext = ({ children }: { children: React.ReactNode }) => {
    const [todoList, setTodoList] = useState<Todo[]>([]);

    const createTodo = useCallback(async ({ title, content }: TodoInput) => {
        const todo = await todoApi.createTodo({ title, content });
        if (todo.id) {
            setTodoList((prev) => [...prev, todo]);
        }
    }, []);

    const getTodo = useCallback(async (id: string) => {
        const todo = await todoApi.getTodo(id);
        return todo;
    }, []);

    const getTodoList = useCallback(async () => {
        const todo = await todoApi.getTodoList();
        setTodoList(todo);
        return todo;
    }, []);

    const updateTodo = useCallback(
        async ({
            id,
            title,
            content,
        }: Pick<Todo, "id" | "title" | "content">) => {
            const todo = await todoApi.updateTodo({ id, title, content });
            setTodoList((prev) => {
                const _prev = [...prev];
                const todoIndex = prev.findIndex((todo) => todo.id === id);
                if (todoIndex >= 0) {
                    _prev[todoIndex] = todo;
                }
                return _prev;
            });
        },
        []
    );

    const deleteTodo = useCallback(async (id: string) => {
        await todoApi.deleteTodo(id);
        setTodoList((prev) => {
            const _prev = [...prev];
            const todoIndex = prev.findIndex((todo) => todo.id === id);
            _prev.splice(todoIndex, 1);
            return _prev;
        });
    }, []);

    useDidMountEffect(() => {
        console.log("fetch");
        getTodoList();
    }, []);

    return (
        <TodoStateContext.Provider value={todoList}>
            <TodoActionContext.Provider
                value={{
                    createTodo,
                    getTodo,
                    getTodoList,
                    updateTodo,
                    deleteTodo,
                }}
            >
                {children}
            </TodoActionContext.Provider>
        </TodoStateContext.Provider>
    );
};
