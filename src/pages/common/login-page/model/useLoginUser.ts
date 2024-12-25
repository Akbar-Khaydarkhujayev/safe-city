import { useMutation } from "@tanstack/react-query";
import { login } from "../api/login";
import { useUser } from "@/context/user";

export const useLoginUser = () => {
    const { dispatch } = useUser();

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            dispatch({
                type: "SET_USER",
                payload: data.token,
            });
        },
    });

    return mutation;
};
