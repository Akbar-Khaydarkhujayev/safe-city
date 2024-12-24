import { tailChase } from "ldrs";

tailChase.register();

interface LoadingProps {
    size?: string | number;
}

export default function Loading({ size = 28 }: LoadingProps) {
    return <l-tail-chase size={size} speed="1.75" color="white" />;
}
