import { CircularProgress } from '@mui/material';

const Spinner = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress color="secondary" />
    </div>
  );
};

export default Spinner;
