import { useEffect } from "react";
import cn from "classnames";

import { useForm } from "react-hook-form";
import { useTodoActionContext } from "../context/TodoContext";
import { Todo } from "../types/todo";

const TodoCreate = () => {
    const { createTodo } = useTodoActionContext();

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitSuccessful, errors },
    } = useForm<Todo>();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <form
            className="flex flex-col gap-2 p-3 border-b-2 form-control"
            onSubmit={handleSubmit(createTodo)}
        >
            <div>
                <label className="label">
                    <span className="label-text">제목</span>
                </label>
                <input
                    className={cn("w-full input input-bordered input-sm", {
                        "input-error": !!errors.title,
                    })}
                    {...register("title", { required: true })}
                />
            </div>
            <div>
                <label className="label">
                    <span className="label-text">내용</span>
                </label>
                <input
                    className={cn("w-full input input-bordered input-sm", {
                        "input-error": !!errors.content,
                    })}
                    {...register("content", { required: true })}
                />
            </div>
            <button type="submit" className="btn btn-sm btn-bordered">
                추가
            </button>
        </form>
    );
};

export default TodoCreate;
