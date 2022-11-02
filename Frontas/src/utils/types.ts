import { Dispatch, SetStateAction } from 'react';
import { Group } from '@/graphql/types';

export type SetState<T> = Dispatch<SetStateAction<T>>;
export type UserReservation = {
  id: string;
  group: Group;
};
