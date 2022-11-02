import { FC, useState } from 'react';
import { Alert, AlertColor, Button, Card, CardContent, CardMedia, Dialog, Grid, Typography } from '@mui/material';
import moment from 'moment';
import { useAppState } from '@/contexts/AppStateProvider';
import { Cancel } from '@mui/icons-material';
import { useCancelReservationMutation } from '@/graphql/hooks';
import { UserReservation } from '@/utils';

type GroupElementProps = {
  reservation: UserReservation;
  refetchHandler: any;
};

type ResponseDialogProps = {
  message: string;
  color: AlertColor;
};

const UserGroupElement: FC<GroupElementProps> = ({ reservation, refetchHandler }) => {
  const { user } = useAppState();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialog, setDialog] = useState<ResponseDialogProps>();

  const handleCancelReservation = async (reservationId: string) => {
    await cancelReservation({ variables: { reservationId } });
    setDialog({ color: 'error', message: 'Rezervacija atšaukta' });
    if (refetchHandler) {
      await refetchHandler();
    }

    setIsDialogOpen(true);
  };
  const [cancelReservation] = useCancelReservationMutation({
    onError: () => null,
  });

  return (
    <Card>
      <CardMedia component="img" image="sightseeing.jpg" sx={{ height: '50vh' }} />
      <CardContent>
        <Grid container spacing={2} width="100%">
          <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
            <Typography gutterBottom variant="h3" component="div">
              {reservation.group.destination}
            </Typography>
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
            <Typography gutterBottom variant="h4" component="div">
              {moment(reservation.group.startDate).format('ll')} - {moment(reservation.group.endDate).format('ll')}
            </Typography>
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
            <Typography gutterBottom variant="h4" component="div">
              {reservation.group.price}$
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="h5" color="text.secondary">
          {reservation.group.description}
        </Typography>
        {user ? (
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            endIcon={<Cancel />}
            onClick={() => handleCancelReservation(reservation.id)}
          >
            Atšaukti
          </Button>
        ) : null}
        <Dialog onClose={() => setIsDialogOpen(false)} open={isDialogOpen}>
          <Alert severity={dialog?.color}>{dialog?.message}</Alert>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default UserGroupElement;
