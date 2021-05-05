import React from 'react';
import ContentLoader from 'react-content-loader';

function LoadingBlock() {
  return (
    <ContentLoader
      className={'pizza-block'}
      speed={2}
      width={280}
      height={500}
      viewBox="0 0 260 430"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <rect x="1" y="292" rx="5" ry="5" width="276" height="22" />
      <rect x="-1" y="321" rx="7" ry="7" width="280" height="70" />
      <rect x="2" y="399" rx="3" ry="3" width="91" height="67" />
      <rect x="169" y="395" rx="13" ry="13" width="105" height="40" />
      <circle cx="120" cy="120" r="120" />
    </ContentLoader>
  );
}

export default LoadingBlock;
