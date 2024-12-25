import { useUser } from "@/context/user";
import { useEffect, useState } from "react";

export default function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { state: token } = useUser();

    useEffect(() => {
        setIsAuthenticated(!!token);

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [token]);

    return { isAuthenticated, isLoading };
}
