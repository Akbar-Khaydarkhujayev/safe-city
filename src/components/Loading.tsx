import { trio } from "ldrs";
import { tailChase } from "ldrs";

trio.register();
tailChase.register();

interface LoadingProps {
    type?: string;
    size?: string | number;
}

export default function Loading({ size = 28, type }: LoadingProps) {
    if (type === "tailChase")
        return <l-tail-chase size={size} speed="1.75" color="white" />;
    else return <l-trio size={size} speed="1.3" color="white" />;
}
