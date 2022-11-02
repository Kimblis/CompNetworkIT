import { Modal, Box, Stack, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { FC, SetStateAction, useEffect, useState } from 'react';

import { GroupReservation } from '@/graphql/types';
import CloseButton from '@/components/Common/CloseButton';
import { useCancelReservationMutation } from '@/graphql/hooks';
import { Cancel } from '@mui/icons-material';

type ActiveBookingsProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
  reservations: GroupReservation[];
  refetchHandler: any;
};

const ActiveBookingsModal: FC<ActiveBookingsProps> = ({
  isModalOpen,
  setIsModalOpen,
  reservations,
  refetchHandler,
}) => {
  const [createNewGroupMutation] = useCancelReservationMutation({
    onCompleted: () => refetchHandler(),
    onError: () => null,
  });

  return (
    <Modal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          bgcolor: '#ffffff',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <CloseButton setCloseState={setIsModalOpen} />
        {reservations.length ? (
          <Stack spacing={2}>
            {reservations.map((reservation) => (
              <Card key={reservation.id}>
                <CardContent>
                  <Grid
                    container
                    spacing={2}
                    width="100%"
                    alignItems="center"
                    justifyItems="center"
                    display="flex"
                    direction="row"
                  >
                    <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
                      <Typography gutterBottom variant="h5" component="div">
                        {reservation.user?.name}
                      </Typography>
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
                      <Typography gutterBottom variant="h5" component="div">
                        {reservation.user?.email}
                      </Typography>
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
                      <Typography gutterBottom variant="h5" component="div">
                        {reservation.user?.phone}
                      </Typography>
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
                      <Button
                        variant="contained"
                        endIcon={<Cancel />}
                        onClick={() => createNewGroupMutation({ variables: { reservationId: reservation.id } })}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Stack>
        ) : (
          <Typography variant="h1" component="h1" sx={{ textAlign: 'center', mb: '1.5rem' }}>
            Ši kelionė neturi rezervacijų
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default ActiveBookingsModal;
