import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import createEmotionCache from 'config/createEmotionCache';
import theme from 'config/theme';
import AppStateProvider from '@/contexts/AppStateProvider';
import { GraphqlProvider } from '@/contexts/GraphqlProvider';
import UserProvider from '@/contexts/UserProvider';
import { AuthProvider } from '@/contexts/AuthenticationProvider';
import ErrorBoundary from '@/components/Common/ErrorBoundary';

import '../styles/globals.css';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

interface CustomPageProps {
  protected: boolean;
  authPage: boolean;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { authPage: isAuthPage, protected: pageIsProtected } = pageProps as CustomPageProps;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AppStateProvider>
            <GraphqlProvider>
              <AuthProvider isAuthenticationPage={isAuthPage} isPageProtected={pageIsProtected}>
                <UserProvider>
                  <ErrorBoundary>
                    <Component {...pageProps} />
                  </ErrorBoundary>
                </UserProvider>
              </AuthProvider>
            </GraphqlProvider>
          </AppStateProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
