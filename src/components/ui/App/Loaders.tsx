import ContentLoader from "react-content-loader";

export default function AppsLoader() {
    return (
        <>
            {[...Array(3)].map((_, index) => (
                <ContentLoader
                    backgroundColor="transparent"
                    foregroundColor="#8a8a8a"
                    key={index}
                    height="72px"
                    width="100%"
                >
                    <rect
                        x="0"
                        y="0"
                        rx="10"
                        ry="10"
                        width="15%"
                        height="100%"
                    />
                    <rect
                        x="20%"
                        y="0"
                        rx="10"
                        ry="10"
                        width="60%"
                        height="70%"
                    />
                    <rect
                        x="20%"
                        y="80%"
                        rx="10"
                        ry="10"
                        width="30%"
                        height="20%"
                    />
                    <rect
                        x="85%"
                        y="0"
                        rx="10"
                        ry="10"
                        width="15%"
                        height="25%"
                    />
                </ContentLoader>
            ))}
        </>
    );
}
