import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAppState } from '@/contexts/AppStateProvider';
import useLogout from '@/hooks/useLogout';
import { useRouter } from 'next/router';
import { User } from '@/graphql/types';

export default function Header() {
  const router = useRouter();
  const { user } = useAppState();
  const { logout } = useLogout();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box component="div" sx={{ flexGrow: 1, display: 'flex', alignContent: 'center' }}>
            <Button color="inherit" onClick={() => router.replace('/')}>
              Pradžia
            </Button>
          </Box>

          {user ? (
            <>
              <Typography variant="h5" component="div" color="black">
                {`${user.name} ${getUserRole(user)}`}
              </Typography>
              {getUserRole(user) !== 'Vadybininkas' && (
                <Button color="inherit" onClick={() => router.replace('/myReservations')}>
                  Mano kelionės
                </Button>
              )}
              <Button color="inherit" onClick={logout}>
                Atsijungti
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => router.replace('/login')}>
                Prisijungti
              </Button>
              <Button color="inherit" onClick={() => router.replace('/register')}>
                Prisiregistruoti
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const getUserRole = (user: User) => {
  if (user.admin?.id) {
    return 'Administratorius';
  } else if (user.manager?.id) {
    return 'Vadybininkas';
  } else {
    return 'Vartotojas';
  }
};
