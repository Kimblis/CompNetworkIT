import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAppState } from '@/contexts/AppStateProvider';
import Header from '@/components/Header';

export const AuthProvider = ({
  children,
  isPageProtected,
  isAuthenticationPage,
}: {
  children: any;
  isPageProtected: boolean;
  isAuthenticationPage: boolean;
}) => {
  const router = useRouter();
  const { accessToken } = useAppState();

  useEffect(() => {
    const checkRoutes = async () => {
      if (!accessToken && isPageProtected) {
        return router.replace('/login');
      }

      if (accessToken && isAuthenticationPage) {
        return router.replace('/');
      }
    };

    checkRoutes();
  }, [accessToken, isPageProtected, isAuthenticationPage, router]);

  return (
    <>
      <Header />
      {children}
    </>
  );
};
