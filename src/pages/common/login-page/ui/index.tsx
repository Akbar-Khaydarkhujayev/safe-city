import { Controller, SubmitHandler } from "react-hook-form";
import { useLoginForm } from "../model/useLoginForm";
import { LoginFields } from "../model/loginSchema";
import { useLoginUser } from "../model/useLoginUser";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import logo from "/public/logo.png";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    const form = useLoginForm();
    const { mutate, isPending } = useLoginUser();

    const onSubmit: SubmitHandler<LoginFields> = (data) => {
        mutate(data);
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-[400px] shadow-xl p-4"
            >
                <div
                    className="w-[141px] h-[84px] mx-auto"
                    onClick={() => navigate("/")}
                >
                    <img src={logo} />
                </div>

                <div className="w-[60%] mx-auto text-[18px] font-normal text-center my-8">
                    Enter your username and password to log in.
                </div>
                <div className="space-y-6">
                    <Controller
                        control={form.control}
                        defaultValue=""
                        name="username"
                        render={({ field, fieldState }) => (
                            <Input
                                type="text"
                                placeholder="Username"
                                className="bg-white/5 text-center text-[18px] font-normal placeholder:text-[18px] placeholder:font-normal"
                                error={fieldState.error?.message}
                                {...field}
                            />
                        )}
                    />
                    <Controller
                        control={form.control}
                        defaultValue=""
                        name="password"
                        render={({ field, fieldState }) => (
                            <Input
                                type="password"
                                placeholder="Password"
                                className="bg-white/5 text-center text-[18px] font-normal placeholder:text-[18px] placeholder:font-normal"
                                error={fieldState.error?.message}
                                {...field}
                            />
                        )}
                    />
                </div>
                <div className="mt-6">
                    <Button
                        fullWidth
                        border="10px"
                        className="text-[18px] font-semibold"
                        type="submit"
                        isLoading={isPending}
                    >
                        Log in
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
