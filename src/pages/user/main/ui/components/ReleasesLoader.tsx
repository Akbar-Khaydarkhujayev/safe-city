import ContentLoader from "react-content-loader";

export default function ReleasesLoader() {
    return (
        <div className="flex">
            {[...Array(3)].map((_, index) => (
                <ContentLoader
                    backgroundColor="transparent"
                    foregroundColor="#8a8a8a"
                    key={index}
                    height="256px"
                    width="100%"
                >
                    <rect
                        x="0"
                        y="0"
                        rx="10"
                        ry="10"
                        width="100%"
                        height="100%"
                    />
                </ContentLoader>
            ))}
        </div>
    );
}
