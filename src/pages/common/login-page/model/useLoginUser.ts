import { useMutation } from "@tanstack/react-query";
import { login } from "../api/login";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/user";

export const useLoginUser = () => {
    const navigate = useNavigate();
    const { dispatch } = useUser();

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            dispatch({
                type: "SET_USER",
                payload: data.token,
            });
            localStorage.setItem("token", data.token);
            navigate("/admin");
        },
    });

    return mutation;
};
