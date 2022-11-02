import Spinner from '@/components/Common/Spinner';
import NewGroupModal from '@/components/Forms/NewGroupForm';
import GroupElement from '@/components/Vacation/GroupElement';
import { useAppState } from '@/contexts/AppStateProvider';
import { useGroupsLazyQuery } from '@/graphql/hooks';
import { Group, ReservationTypeEnum } from '@/graphql/types';
import { AddCircle } from '@mui/icons-material';
import { Box, Button, Grid, Pagination, Typography } from '@mui/material';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const SightSeeingTripPage: NextPage = () => {
  const { user } = useAppState();
  const [groups, setGroups] = useState<Group[]>([]);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [getSightSeeingGroups, { refetch }] = useGroupsLazyQuery({
    onCompleted({ groupsByType: { count, groups } }) {
      setCount(count);
      setGroups(groups as Group[]);
    },
    onError: (error) => console.log(error),
    fetchPolicy: 'network-only',
    refetchWritePolicy: 'overwrite',
  });

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    getSightSeeingGroups({
      variables: { type: ReservationTypeEnum.Sightseeing, paginationOptions: { limit: 20, offset: (page - 1) * 20 } },
    });
  }, [getSightSeeingGroups, page]);

  return groups.length ? (
    <>
      <Box>
        <Typography variant="h1" component="h1" align="center" mt={5}>
          Pažintinės kelionės
        </Typography>
        {user?.admin?.id ? (
          <Box sx={{ width: '100%', display: 'grid', justifyContent: 'center' }}>
            <Button variant="contained" endIcon={<AddCircle />} onClick={() => setIsModalOpen(true)}>
              Sukurti naują pasiūlymą
            </Button>
            <NewGroupModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              adminId={user.admin.id as string}
            />
          </Box>
        ) : null}
      </Box>

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

export default SightSeeingTripPage;
