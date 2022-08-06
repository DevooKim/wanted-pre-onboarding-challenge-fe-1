import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useTodoActionContext } from "../context/TodoContext";
import useDidMountEffect from "../hooks/useDidMountEffect";
import TodoActionButton from "./TodoActionButton";
import { Todo } from "../types/todo";
import { FormProvider, useForm } from "react-hook-form";

export enum Mode {
    "read",
    "edit",
}

const TodoDetail = () => {
    const { getTodo } = useTodoActionContext();
    const { id } = useParams();
    const methods = useForm();
    const { register, reset } = methods;

    const [todo, setTodo] = useState<Todo | undefined>();
    const [mode, setMode] = useState<Mode>(Mode.read);

    const onChangeMode = useCallback((mode: Mode) => setMode(mode), []);

    useDidMountEffect(() => {
        reset();
        onChangeMode(Mode.read);
    }, [id]);

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

    if (!todo) {
        return null;
    }

    return (
        <FormProvider {...methods}>
            <div className="flex flex-col items-center justify-center w-full gap-4 p-6 h-3/5">
                <div className="flex flex-col w-full basis-6">
                    <div className="text-xl ">제목</div>
                    {mode === Mode.read ? (
                        <div className="flex items-center h-10 p-2 text-sm text-justify border rounded-lg">
                            {todo?.title}
                        </div>
                    ) : (
                        <input
                            className="h-10 p-2 text-sm input input-bordered input-accent"
                            // value={todo?.title}
                            {...register("title", {
                                required: true,
                                value: todo?.title,
                            })}
                        />
                    )}
                </div>

                <div className="flex flex-col flex-1 w-full h-12">
                    <div className="text-xl ">내용</div>
                    {mode === Mode.read ? (
                        <div className="h-full p-2 text-sm border-2 rounded-lg">
                            {todo?.content}
                        </div>
                    ) : (
                        <textarea
                            className="h-full p-2 text-sm textarea textarea-bordered textarea-accent"
                            // value={todo?.content}
                            {...register("content", {
                                required: true,
                                value: todo?.content,
                            })}
                        />
                    )}
                </div>

                <TodoActionButton
                    todo={todo}
                    setTodo={setTodo}
                    mode={mode}
                    onChangeMode={onChangeMode}
                />
            </div>
        </FormProvider>
    );
};

export default TodoDetail;
