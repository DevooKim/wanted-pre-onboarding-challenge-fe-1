import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthActionContext } from "../../context/AuthContext";
import { AuthInfo } from "../../types/auth";

const LoginPage = () => {
    const { loginHandler } = useAuthActionContext();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<AuthInfo>();
    const onSubmit: SubmitHandler<AuthInfo> = async ({ email, password }) => {
        await loginHandler({ email, password });
        navigate("/todo");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="email" {...register("email", { required: true })} />
            <input
                type="password"
                {...register("password", { required: true })}
            />
            <input type="submit" />
        </form>
    );
};

export default LoginPage;
