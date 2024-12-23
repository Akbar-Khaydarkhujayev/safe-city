import { axiosInstance } from "@/config/axios";
import { LoginFields } from "../model/loginSchema";

export const login = async (input: LoginFields) => {
    const response = await axiosInstance.post("auth/login", input);
    return response.data.data as { token: string };
};
