import { ApolloClient, InMemoryCache, from, split } from '@apollo/client';
import { Dispatch, SetStateAction } from 'react';

import { authLink, retryLink, httpLink, getErrorLink } from './apolloLinks';

export const generateApolloClient = (setAccessToken: Dispatch<SetStateAction<string | null>>) => {
  const errorLink = getErrorLink(setAccessToken);
  return new ApolloClient({
    link: from([authLink, httpLink, retryLink, errorLink]),
    cache: new InMemoryCache(),
  });
};
