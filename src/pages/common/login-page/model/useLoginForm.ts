import { useForm } from "react-hook-form";
import { LoginFields, loginSchema } from "./loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export const useLoginForm = () => {
    const form = useForm<LoginFields>({
        resolver: zodResolver(loginSchema),
    });

    return form;
};
