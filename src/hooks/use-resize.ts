import { useEffect, useState } from "react";

export default function useResize() {
    const [sm, setSm] = useState(false);
    const [md, setMd] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setSm(window.innerWidth < 640);
            setMd(window.innerWidth < 768);
        };

        handleResize(); // Set initial value
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return { sm, md };
}
