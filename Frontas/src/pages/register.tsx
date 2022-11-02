import { Container, Grid, Box, Typography, Link as MuiLink, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FC } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import FormInput from '@/components/Forms/FormInput';
import { useRegisterMutation } from '@/graphql/hooks';
import { useAppState } from '@/contexts/AppStateProvider';

export const OauthMuiLink = styled(MuiLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f6f7;
  border-radius: 1;
  padding: 0.6rem 0;
  column-gap: 1rem;
  text-decoration: none;
  color: #393e45;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    box-shadow: 0 1px 13px 0 rgb(0 0 0 / 15%);
  }
`;

const registerSchema = object({
  email: string().min(1, 'Email is required').email('Email is invalid'),
  name: string().min(1, 'Name is required'),
  password: string().min(1, 'Password is required').max(32, 'Password must be less than 32 characters'),
  phone: string().min(1, 'Phone number is required'),
});

type IRegister = TypeOf<typeof registerSchema>;

const RegisterPage: FC = () => {
  const router = useRouter();
  const { setAccessToken } = useAppState();

  const [loginMutation] = useRegisterMutation({
    onCompleted: ({ register: { accessToken } }) => {
      setAccessToken(accessToken);
      router.replace('/');
    },
    onError: () => null,
  });

  // 👇 Default Values
  const defaultValues: IRegister = {
    email: '',
    password: '',
    name: '',
    phone: '',
  };

  // 👇 The object returned from useForm Hook
  const methods = useForm<IRegister>({
    resolver: zodResolver(registerSchema),
    defaultValues,
  });

  // 👇 Submit Handler
  const onSubmitHandler: SubmitHandler<IRegister> = async (registerData: IRegister) => {
    await loginMutation({ variables: registerData });
  };

  // 👇 JSX to be rendered
  return (
    <Container maxWidth={false} sx={{ height: '100vh', backgroundColor: { xs: '#fff', md: '#f4f4f4' } }}>
      <Grid container justifyContent="center" alignItems="center" sx={{ width: '100%', height: '100%' }}>
        <Grid item sx={{ maxWidth: '70rem', width: '100%', backgroundColor: '#fff' }}>
          <FormProvider {...methods}>
            <Grid
              container
              sx={{
                boxShadow: { sm: '0 0 5px #ddd' },
                py: '6rem',
                px: '1rem',
              }}
            >
              <Grid
                item
                container
                justifyContent="space-between"
                rowSpacing={5}
                sx={{
                  maxWidth: { sm: '45rem' },
                  marginInline: 'auto',
                }}
              >
                <Grid item xs={12} sm={6} sx={{ borderRight: { sm: '1px solid #ddd' } }}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{ paddingRight: { sm: '3rem' } }}
                    onSubmit={methods.handleSubmit(onSubmitHandler)}
                  >
                    <Typography variant="h6" component="h1" sx={{ textAlign: 'center', mb: '1.5rem' }}>
                      Register new account
                    </Typography>

                    <FormInput type="text" label="Vardas" name="name" required focused />
                    <FormInput type="email" label="El.paštas" name="email" focused required />
                    <FormInput type="text" label="Tel. numeris" name="phone" focused required />
                    <FormInput type="password" label="Slaptažodis" name="password" required focused />

                    <LoadingButton
                      loading={false}
                      type="submit"
                      variant="contained"
                      sx={{
                        py: '0.8rem',
                        mt: 2,
                        width: '80%',
                        marginInline: 'auto',
                      }}
                    >
                      Registruotis
                    </LoadingButton>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ pl: 3 }}>
                  <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
                    <Typography variant="h3" component="h1">
                      Jau turite paskyrą?
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        py: '0.8rem',
                        mt: 2,
                        width: '80%',
                        marginInline: 'auto',
                      }}
                      onClick={() => router.replace('/login')}
                    >
                      Prisijungti
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </FormProvider>
        </Grid>
      </Grid>
    </Container>
  );
};

export function getServerSideProps() {
  return {
    props: {
      protected: false,
      authPage: true,
    },
  };
}

export default RegisterPage;
