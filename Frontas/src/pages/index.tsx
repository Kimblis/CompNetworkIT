import { useAppState } from '@/contexts/AppStateProvider';
import type { NextPage } from 'next';
import VacationTypeListing from '@/components/Vacation/VacationTypeListing';
import { Box, Button, Divider, Typography } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import NewGroupModal from '@/components/Forms/NewGroupForm';
import { useState } from 'react';

const Home: NextPage = () => {
  const { user } = useAppState();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      {user?.admin?.id ? (
        <Box sx={{ width: '100%', display: 'grid', justifyContent: 'center', mt: 5 }}>
          <Button variant="contained" endIcon={<AddCircle />} onClick={() => setIsModalOpen(true)}>
            Sukurti naują pasiūlymą
          </Button>
          <NewGroupModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} adminId={user.admin.id as string} />
        </Box>
      ) : null}
      <VacationTypeListing />
      <Divider sx={{ borderBottom: 2 }} />
      <Typography variant="h3" component="h1" align="center" mt={5}>
        Darbą atliko: Edgaras Masilionis IFD moduliui Kompiuteriu Tinklai
      </Typography>
    </>
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

export default Home;
