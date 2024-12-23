import { Controller, SubmitHandler } from "react-hook-form";
import { useLoginForm } from "../model/useLoginForm";
import { LoginFields } from "../model/loginSchema";
import { useLoginUser } from "../model/useLoginUser";
import Button from "@/components/ui/Button";

const LoginPage = () => {
    const form = useLoginForm();
    const { mutate } = useLoginUser();

    const onSubmit: SubmitHandler<LoginFields> = (data) => {
        mutate(data, {
            onSuccess: () => {
                console.log("success");
            },
        });
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-[500px] shadow-xl p-4"
            >
                <div className="w-[250px] h-[250px] mx-auto mb-10">
                    <img
                        src="/images/logo.png"
                        className="w-full h-full object-cover object-center"
                    />
                </div>
                <div className="space-y-2">
                    <Controller
                        control={form.control}
                        defaultValue=""
                        name="username"
                        render={({ field, fieldState }) => <input {...field} />}
                    />
                    <Controller
                        control={form.control}
                        defaultValue=""
                        name="password"
                        render={({ field, fieldState }) => (
                            <input type="password" {...field} />
                        )}
                    />
                </div>
                <div className="mt-10">
                    <Button fullWidth className="mx-auto" type="submit">
                        Login
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
