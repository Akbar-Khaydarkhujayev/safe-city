import { useUser } from "@/context/user";
import { useEffect, useState } from "react";

export default function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { state: token } = useUser();

    useEffect(() => {
        setIsAuthenticated(!!token);
    }, []);

    return isAuthenticated;
}
