import { FC, useState } from 'react';
import { Alert, AlertColor, Button, Card, CardContent, CardMedia, Dialog, Grid, Typography } from '@mui/material';
import { Group } from '@/graphql/types';
import moment from 'moment';
import { useAppState } from '@/contexts/AppStateProvider';
import { AddCircle, List, Cancel } from '@mui/icons-material';
import ActiveBookingsModal from '../Forms/ActiveBookings';
import { useCreateNewReservationMutation, useDeleteGroupMutation } from '@/graphql/hooks';

type GroupElementProps = {
  group: Group;
  refetchHandler: any;
};

type ResponseDialogProps = {
  message: string;
  color: AlertColor;
};

const GroupElement: FC<GroupElementProps> = ({ group, refetchHandler }) => {
  const { user } = useAppState();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialog, setDialog] = useState<ResponseDialogProps>();

  const handleNewReservation = async (group: Group) => {
    if (group.groupReservations.length >= group.groupSize) {
      setDialog({ color: 'error', message: 'Nebėra laisvų vietų' });
      return setIsDialogOpen(true);
    }

    await createNewReservationMutation({ variables: { groupId: group.id } });
    setDialog({ color: 'success', message: 'Sėkmingai užsirezervavote' });
    if (refetchHandler) {
      await refetchHandler();
    }

    setIsDialogOpen(true);
  };

  const handleGroupDeletion = async (group: Group) => {
    await deleteGroup({ variables: { groupId: group.id } });
    setDialog({ color: 'error', message: 'Kelionė panaikinta' });
    if (refetchHandler) {
      await refetchHandler();
    }

    setIsDialogOpen(true);
  };

  const [createNewReservationMutation] = useCreateNewReservationMutation({
    onError: () => null,
  });
  const [deleteGroup] = useDeleteGroupMutation({
    onError: () => null,
  });

  const groupIsFull = group.groupReservations?.length >= group.groupSize;
  const userIsManager = user?.manager?.id;

  return (
    <Card>
      <CardMedia component="img" image="sightseeing.jpg" sx={{ height: '50vh' }} />
      <CardContent>
        <Grid container spacing={2} width="100%">
          <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
            <Typography gutterBottom variant="h3" component="div">
              {group.destination}
            </Typography>
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
            <Typography gutterBottom variant="h4" component="div">
              {moment(group.startDate).format('ll')} - {moment(group.endDate).format('ll')}
            </Typography>
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
            <Typography gutterBottom variant="h4" component="div">
              {group.price}$
            </Typography>
          </Grid>
          {userIsManager ? (
            <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
              <Typography gutterBottom variant="h4" component="div">
                {`Nupirkta bilietų: ${group.groupReservations.length} / ${group.groupSize}`}
              </Typography>
            </Grid>
          ) : null}
        </Grid>
        <Typography variant="h5" color="text.secondary">
          {group.description}
        </Typography>
        {user?.admin?.id ? (
          <>
            <Button sx={{ mt: 2 }} variant="contained" endIcon={<List />} onClick={() => setIsModalOpen(true)}>
              Peržiūrėti rezervacijas
            </Button>
            <Button
              sx={{ mt: 2, ml: 2 }}
              variant="contained"
              endIcon={<Cancel />}
              onClick={() => handleGroupDeletion(group)}
            >
              Panaikinti kelionę
            </Button>
            <ActiveBookingsModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              reservations={group.groupReservations}
              refetchHandler={refetchHandler}
            />
          </>
        ) : null}
        {user ? (
          <Button
            sx={{ mt: 2, ml: 2 }}
            variant="contained"
            endIcon={<AddCircle />}
            onClick={() => handleNewReservation(group)}
          >
            Rezervuoti
          </Button>
        ) : null}
        <Dialog onClose={() => setIsDialogOpen(false)} open={isDialogOpen}>
          <Alert severity={dialog?.color}>{dialog?.message}</Alert>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default GroupElement;
