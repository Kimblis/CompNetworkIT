import { useEffect } from 'react';
import React from 'react';

import { useMyUserLazyQuery } from '@/graphql/hooks';
import { useAppState } from '@/contexts/AppStateProvider';
import LoadingView from '@/components/Templates/MainLayout/Loading/LoadingView';
import { User } from '@/graphql/types';

const UserProvider = ({ children }: { children: JSX.Element }) => {
  const { accessToken, user, setUser, setAccessToken } = useAppState();

  const [getUser, { client }] = useMyUserLazyQuery({
    onCompleted({ myUser }) {
      setUser((myUser as User) || null);
    },
    onError: () =>
      client?.clearStore().then(() => {
        setAccessToken(null);
        setUser(null);
      }),
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (accessToken && !user) getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, user]);

  return children;
};

export default UserProvider;
