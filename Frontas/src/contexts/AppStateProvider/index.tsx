import React, { createContext, SetStateAction, useContext, useState } from 'react';

import { User } from '@/graphql/types';

import useLocalStorage from '@/hooks/useLocalStorage';

interface StateContextType {
  accessToken: string;
  user: User;
  setUser: React.Dispatch<SetStateAction<User | null>>;
  setAccessToken: React.Dispatch<SetStateAction<string | null>>;
}

export const StateContext = createContext<StateContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function AppStateProvider({ children }: Props) {
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', null);
  const [user, setUser] = useState<User>();
  const contextValue = {
    accessToken,
    setAccessToken,
    user,
    setUser,
  } as StateContextType;

  return <StateContext.Provider value={{ ...contextValue }}>{children}</StateContext.Provider>;
}

export function useAppState() {
  const context = useContext(StateContext);
  if (!context) throw new Error('useAppState must be used within the AppStateProvider');

  return context;
}
