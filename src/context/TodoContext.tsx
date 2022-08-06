import React, { createContext, useCallback, useEffect, useState } from "react";

import { Todo, TodoInput } from "../types/todo";
import todoApi from "../apis/todo";

interface IActionContext {
    getTodos: () => Promise<Todo[]> | void;
    getTodo: (id: string) => Promise<Todo> | void;
    createTodo: (todo: TodoInput) => void;
    updateTodo: (todo: Pick<Todo, "id" | "title" | "content">) => void;
    deleteTodo: (id: string) => void;
}

const defaultActionState = {
    getTodos: () => {},
    getTodo: () => {},
    createTodo: () => {},
    updateTodo: () => {},
    deleteTodo: () => {},
};

const TodoStateContext = createContext<Todo[]>([]);
const TodoActionContext = createContext<IActionContext>(defaultActionState);

export const TodoContext = ({ children }: { children: React.ReactNode }) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const createTodo = useCallback(async ({ title, content }: TodoInput) => {
        const todo = await todoApi.createTodo({ title, content });
        if (todo.id) {
            setTodos((prev) => [...prev, todo]);
        }
    }, []);

    const getTodo = useCallback(async (id: string) => {
        const todo = await todoApi.getTodo(id);
        return todo;
    }, []);

    const getTodos = useCallback(async () => {
        const todo = await todoApi.getTodos();
        setTodos(todo);
        return todo;
    }, []);

    const updateTodo = useCallback(
        async ({
            id,
            title,
            content,
        }: Pick<Todo, "id" | "title" | "content">) => {
            const todo = await todoApi.updateTodo({ id, title, content });
            setTodos((prev) => {
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
        setTodos((prev) => {
            const _prev = [...prev];
            const todoIndex = prev.findIndex((todo) => todo.id === id);
            _prev.splice(todoIndex, 1);
            return _prev;
        });
    }, []);

    useEffect(() => {
        console.log("fetch");
        getTodos();
    }, []);

    return (
        <TodoStateContext.Provider value={todos}>
            <TodoActionContext.Provider
                value={{
                    createTodo,
                    getTodo,
                    getTodos,
                    updateTodo,
                    deleteTodo,
                }}
            >
                {children}
            </TodoActionContext.Provider>
        </TodoStateContext.Provider>
    );
};
