import { Todo, TodoInput } from "../types/todo";
import axiosInstance from "./axiosInstance";

const getTodoList = async (): Promise<Todo[]> => {
    const { data } = await axiosInstance({
        url: "/todos",
        method: "GET",
    });

    return data.data;
};

const getTodo = async (id: string): Promise<Todo> => {
    const { data } = await axiosInstance({
        url: `/todos/${id}`,
        method: "GET",
    });

    return data.data;
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

    return data.data;
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

    return data.data;
};

const deleteTodo = async (id: string): Promise<null> => {
    const { data } = await axiosInstance({
        url: `/todos/${id}`,
        method: "DELETE",
    });

    return data.data;
};

export default {
    getTodoList,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo,
};
