import React from 'react';

import Loading from './index';

interface Props {
  className?: string;
}

const LoadingView = ({ className }: Props) => (
  <div className="w-100 h-100 d-flex justify-content-center align-items-center">
    <Loading className={className} />
  </div>
);

export default LoadingView;
