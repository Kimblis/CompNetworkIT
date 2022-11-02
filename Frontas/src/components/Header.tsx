import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAppState } from '@/contexts/AppStateProvider';
import useLogout from '@/hooks/useLogout';
import { useRouter } from 'next/router';

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
              <Button color="inherit" onClick={() => router.replace('/myReservations')}>
                Mano kelionės
              </Button>
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
