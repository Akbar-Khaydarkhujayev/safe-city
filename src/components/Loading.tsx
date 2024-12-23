import { dotStream } from "ldrs";

dotStream.register();

interface LoadingProps {
    size?: string | number;
}

const Loading = ({ size = 60 }: LoadingProps) => (
    <l-reuleaux size={size} speed="1.5" color="white"></l-reuleaux>
);

export default Loading;
