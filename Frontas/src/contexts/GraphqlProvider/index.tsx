import React, { useEffect, useState } from 'react';
import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client';

import { useAppState } from '@/contexts/AppStateProvider';
import { generateApolloClient } from '@/graphql/generateApolloClient';

interface Props {
  children: React.ReactNode;
}

export const GraphqlProvider = ({ children }: Props) => {
  const { accessToken, setAccessToken } = useAppState();
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();
  useEffect(() => {
    const generatedClient = generateApolloClient(setAccessToken);
    setClient(generatedClient as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  if (!client) return null;

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
