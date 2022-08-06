import cn from "classnames";
import { useEffect, useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
    useAuthActionContext,
    useAuthStateContext,
} from "../context/AuthContext";
import { AuthInfo } from "../types/auth";

const SignUpPage = () => {
    const { isLogin } = useAuthStateContext();
    const { signUpHandler } = useAuthActionContext();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { isValid, isSubmitSuccessful, isSubmitted },
    } = useForm<AuthInfo>({ mode: "onChange" });
    const onSubmit: SubmitHandler<AuthInfo> = async ({ email, password }) => {
        await signUpHandler({ email, password });
        navigate("/todo");
    };

    const isFailSignUp = useMemo(
        () => isSubmitted && !isSubmitSuccessful,
        [isSubmitted, isSubmitSuccessful]
    );

    useEffect(() => {
        if (isLogin) {
            return navigate(-1);
        }
    }, [isLogin]);

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="mb-5">Sign Up</h1>
            <form
                className="gap-2 form-control w-96"
                onSubmit={handleSubmit(onSubmit)}
            >
                <input
                    className={cn("input input-bordered input-sm", {
                        "input-error": isFailSignUp,
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
                        "input-error": isFailSignUp,
                    })}
                    type="password"
                    {...register("password", { required: true, minLength: 8 })}
                    placeholder="password (minLength is 8)"
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

export default SignUpPage;
