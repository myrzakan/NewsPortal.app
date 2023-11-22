import ContentLoader from 'react-content-loader';

export const Skeleton = props => (
  <ContentLoader
    speed={2}
    width={1900}
    height={700}
    viewBox="0 0 1900 700"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="267" y="325" rx="0" ry="0" width="2" height="7" />
    <rect x="0" y="127" rx="10" ry="10" width="580" height="450" />
    <rect x="0" y="44" rx="10" ry="10" width="580" height="40" />
    <rect x="122" y="447" rx="25" ry="25" width="152" height="45" />
    <rect x="0" y="95" rx="5" ry="5" width="580" height="21" />
    <rect x="0" y="592" rx="10" ry="10" width="580" height="35" />
  </ContentLoader>
);
