import { RetryLink } from '@apollo/client/link/retry';
import { Dispatch, SetStateAction } from 'react';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { createHttpLink } from '@apollo/client';

const backEndUri = process.env.BACKEND_URL;

export const httpLink = createHttpLink({ uri: backEndUri });

export const getErrorLink = (setAccessToken: Dispatch<SetStateAction<string | null>>) =>
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.extensions?.code === 'UNAUTHENTICATED') {
          localStorage.removeItem('accessToken');
          setAccessToken(null);
        }
      }
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

export const authLink = setContext((_, { headers }) => {
  let token = null;
  try {
    token = localStorage.getItem('accessToken') || null;
  } catch (e) {}

  return { headers: { ...headers, authorization: token } };
});

export const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true,
  },
  attempts: {
    max: Infinity,
    retryIf: (error) => !!error,
  },
});
