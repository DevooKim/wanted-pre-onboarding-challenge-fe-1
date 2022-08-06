import { Todo, TodoInput } from "../types/todo";
import { axiosInstance } from "./axiosInstance";

const getTodos = async (): Promise<Todo[]> => {
    const { data } = await axiosInstance({
        url: "/todos",
        method: "GET",
    });

    return data;
};

const getTodo = async (id: string): Promise<Todo> => {
    const { data } = await axiosInstance({
        url: `/todo/${id}`,
        method: "GET",
    });

    return data;
};

const createTodo = async ({ title, content }: TodoInput): Promise<Todo> => {
    const { data } = await axiosInstance({
        url: `/todos`,
        method: "POST",
        data: {
            title,
            content,
        },
    });

    return data;
};

const updateTodo = async ({
    id,
    title,
    content,
}: Pick<Todo, "id" | "title" | "content">): Promise<Todo> => {
    const { data } = await axiosInstance({
        url: `/todos/${id}`,
        method: "PUT",
        data: {
            title,
            content,
        },
    });

    return data;
};

const deleteTodo = async (id: string): Promise<null> => {
    const { data } = await axiosInstance({
        url: `/todo/${id}`,
        method: "DELETE",
    });

    return data;
};

export default {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo,
};
