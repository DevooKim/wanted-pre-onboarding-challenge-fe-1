import cn from "classnames";
import { useEffect, useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
    useAuthActionContext,
    useAuthStateContext,
} from "../context/AuthContext";
import { AuthInfo } from "../types/auth";

const LoginPage = () => {
    const { isLogin } = useAuthStateContext();
    const { loginHandler } = useAuthActionContext();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { isValid, isSubmitSuccessful, isSubmitted },
    } = useForm<AuthInfo>({ mode: "onChange" });
    const onSubmit: SubmitHandler<AuthInfo> = async ({ email, password }) => {
        await loginHandler({ email, password });
        navigate("/todo");
    };

    const isFailLogin = useMemo(
        () => isSubmitted && !isSubmitSuccessful,
        [isSubmitted, isSubmitSuccessful]
    );

    useEffect(() => {
        if (isLogin) {
            return navigate(-1);
        }
    }, [isLogin]);

    return (
        <div className="flex flex-col justify-center items-center h-full">
            <h1 className="mb-5">Login</h1>
            <form
                className="form-control gap-2 w-96"
                onSubmit={handleSubmit(onSubmit)}
            >
                <input
                    className={cn("input input-bordered input-sm", {
                        "input-error": isFailLogin,
                    })}
                    type="email"
                    {...register("email", {
                        required: true,
                        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                    })}
                    placeholder="email"
                />
                <input
                    className={cn("input input-bordered input-sm", {
                        "input-error": isFailLogin,
                    })}
                    type="password"
                    {...register("password", { required: true, minLength: 8 })}
                    placeholder="password"
                />
                <input
                    className="input input-bordered input-accent input-sm"
                    type="submit"
                    disabled={!isValid}
                />
            </form>
        </div>
    );
};

export default LoginPage;
