import ContentLoader from "react-content-loader"

export const DrawerSkeleton = () => (
  <ContentLoader 
    speed={2}
    width={325}
    height={120}
    viewBox="0 0 325 120"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="20" y="20" rx="5" ry="5" width="70" height="70" /> 
    <rect x="111" y="30" rx="2" ry="2" width="150" height="35" /> 
    <rect x="111" y="72" rx="2" ry="2" width="80" height="17" /> 
    <rect x="276" y="66" rx="7" ry="7" width="32" height="32" />
  </ContentLoader>
)

