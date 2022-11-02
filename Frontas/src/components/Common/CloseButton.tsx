import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { FC, SetStateAction } from 'react';

type CloseButtonProps = {
  setCloseState: React.Dispatch<SetStateAction<boolean>>;
};

const CloseButton: FC<CloseButtonProps> = ({ setCloseState }) => {
  return (
    <IconButton
      aria-label="close"
      onClick={() => setCloseState(false)}
      sx={{
        position: 'absolute',
        right: 8,
        top: 8,
        fontSize: 15,
        zIndex: 500,
        color: (theme) => theme.palette.grey[500],
      }}
    >
      <Close />
    </IconButton>
  );
};

export default CloseButton;
