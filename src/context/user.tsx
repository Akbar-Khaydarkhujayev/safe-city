import React, { createContext, useReducer, useContext, ReactNode } from "react";

type UserAction =
    | { type: "SET_USER"; payload: string }
    | { type: "CLEAR_USER" };

const UserContext = createContext<{
    state: string | null;
    dispatch: React.Dispatch<UserAction>;
}>({
    state: localStorage.getItem("token") || null,
    dispatch: () => null,
});

const userReducer = (
    state: string | null,
    action: UserAction
): string | null => {
    switch (action.type) {
        case "SET_USER":
            window.location.reload();
            window.location.href = "/";
            return action.payload;
        case "CLEAR_USER":
            localStorage.removeItem("token");
            window.location.reload();
            return null;
        default:
            return state;
    }
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(userReducer, null);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
