import Spinner from '@/components/Common/Spinner';
import GroupElement from '@/components/Vacation/GroupElement';
import { useGroupsLazyQuery } from '@/graphql/hooks';
import { Group, ReservationTypeEnum } from '@/graphql/types';
import { Box, Grid, Pagination, Typography } from '@mui/material';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const UniversalTripPage: NextPage = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [getUniversalGroups, { refetch }] = useGroupsLazyQuery({
    onCompleted({ groupsByType: { count, groups } }) {
      setCount(count);
      setGroups(groups as Group[]);
    },
    onError: (error) => console.log(error),
    fetchPolicy: 'network-only',
  });

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    getUniversalGroups({
      variables: { type: ReservationTypeEnum.Universal, paginationOptions: { limit: 20, offset: (page - 1) * 20 } },
    });
  }, [getUniversalGroups, page]);

  return groups.length ? (
    <>
      <Typography variant="h1" component="h1" align="center" mt={5}>
        Pažintinės + poilsinės kelionės
      </Typography>
      <Grid container spacing={4} p={4} width="100%">
        {groups.map((group) => (
          <Grid key={group.id} item xl={6} lg={6} md={6} sm={12} xs={12}>
            <GroupElement group={group} key={group.id} refetchHandler={refetch}></GroupElement>
          </Grid>
        ))}
      </Grid>
      <Box width="100%" sx={{ display: 'grid', justifyContent: 'center', alignContent: 'center' }}>
        <Pagination count={Math.ceil(count / 20)} page={page} onChange={handlePageChange} />
      </Box>
    </>
  ) : (
    <Spinner />
  );
};

export function getServerSideProps() {
  return {
    props: {
      protected: false,
      authPage: false,
    },
  };
}

export default UniversalTripPage;
