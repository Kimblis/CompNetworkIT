import { useApolloClient } from '@apollo/client';

import { useAppState } from '@/contexts/AppStateProvider';

function useLogout() {
  const client = useApolloClient();
  const { setUser } = useAppState();
  const { setAccessToken } = useAppState();

  const logout = () => {
    return client.clearStore().then(() => {
      setAccessToken(null);
      setUser(null);
    });
  };

  return { logout };
}

export default useLogout;
