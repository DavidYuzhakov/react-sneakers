import ContentLoader from "react-content-loader"

export const ItemSkeleton = () => (
  <ContentLoader
    speed={2}
    width={150}
    height={192}
    viewBox="0 0 160 192"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    className="mx-auto"
  >
    <rect x="10" y="0" rx="10" ry="10" width="150" height="90" />
    <rect x="10" y="105" rx="5" ry="5" width="150" height="15" />
    <rect x="10" y="125" rx="5" ry="5" width="100" height="19" />
    <rect x="10" y="165" rx="8" ry="8" width="80" height="25" />
    <rect x="128" y="160" rx="10" ry="10" width="32" height="32" />
  </ContentLoader> 
)