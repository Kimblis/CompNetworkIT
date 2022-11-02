import Spinner from '@/components/Common/Spinner';
import UserGroupElement from '@/components/Vacation/UserGroupElement';
import { useUserReservationsLazyQuery } from '@/graphql/hooks';
import { Grid, Typography } from '@mui/material';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { UserReservation } from '@/utils';

const UserReservationsPage: NextPage = () => {
  const [userReservations, setUserReservations] = useState<UserReservation[]>([]);
  const [getUserReservations, { refetch, loading }] = useUserReservationsLazyQuery({
    onCompleted({ userReservations }) {
      setUserReservations(userReservations as UserReservation[]);
    },
    onError: (error) => console.log(error),
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    getUserReservations();
  }, [getUserReservations]);

  return userReservations.length ? (
    <>
      <Typography variant="h1" component="h1" align="center" mt={5}>
        Tavo kelionės
      </Typography>
      <Grid container spacing={4} p={4} width="100%">
        {userReservations.map((reservation) => (
          <Grid key={reservation.id} item xl={6} lg={6} md={6} sm={12} xs={12}>
            <UserGroupElement
              reservation={reservation}
              key={reservation.id}
              refetchHandler={refetch}
            ></UserGroupElement>
          </Grid>
        ))}
      </Grid>
    </>
  ) : (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Typography gutterBottom variant="h1" align="center">
          Dar neturi jokių kelionių
        </Typography>
      )}
    </>
  );
};

export function getServerSideProps() {
  return {
    props: {
      protected: true,
      authPage: false,
    },
  };
}

export default UserReservationsPage;
