import React from 'react';
import { CircularProgress } from '@mui/material';
import cx from 'classnames';

const Loading = ({ className }: { className?: string }) => {
  return (
    <div className={cx('d-flex justify-content-center w-100 align-items-center', className)}>
      <CircularProgress />
    </div>
  );
};

export default Loading;
