import { UpdateUserDetails } from './inputs';

export type CreateNewUserData = {
  name: string;
  email: string;
  password: string;
  phone?: string;
};

export type UpdateUserData = UpdateUserDetails & {
  name?: string;
  phone?: string;
  password?: string;
};
