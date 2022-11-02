export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
  Email: string;
  Phone: string;
};

export type Admin = {
  __typename?: 'Admin';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type DateFilters = {
  endDate: Scalars['DateTime'];
  startDate: Scalars['DateTime'];
};

export type Group = {
  __typename?: 'Group';
  admin: Admin;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  destination: Scalars['String'];
  endDate: Scalars['DateTime'];
  groupReservations: Array<GroupReservation>;
  groupSize: Scalars['Int'];
  id: Scalars['ID'];
  price?: Maybe<Scalars['Int']>;
  startDate: Scalars['DateTime'];
  type: ReservationTypeEnum;
  updatedAt: Scalars['DateTime'];
};

export type GroupReservation = {
  __typename?: 'GroupReservation';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  group: Group;
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
};

export type GroupsByTypePayload = {
  __typename?: 'GroupsByTypePayload';
  count: Scalars['Int'];
  groups: Array<Group>;
};

export type LoginPayload = {
  __typename?: 'LoginPayload';
  accessToken: Scalars['String'];
};

export type Manager = {
  __typename?: 'Manager';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addNewGroupReservation: GroupReservation;
  cancelReservation: GroupReservation;
  createNewGroup: Group;
  deleteGroup: Scalars['Boolean'];
  login: LoginPayload;
  register: LoginPayload;
  updateGroupDetails: Group;
  updateUser: User;
};


export type MutationAddNewGroupReservationArgs = {
  groupId: Scalars['ID'];
};


export type MutationCancelReservationArgs = {
  reservationId: Scalars['ID'];
};


export type MutationCreateNewGroupArgs = {
  adminId: Scalars['ID'];
  details: NewGroupDetails;
};


export type MutationDeleteGroupArgs = {
  groupId: Scalars['ID'];
};


export type MutationLoginArgs = {
  email: Scalars['Email'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['Email'];
  name: Scalars['String'];
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['Phone']>;
};


export type MutationUpdateGroupDetailsArgs = {
  details: UpdateGroupDetails;
  groupId: Scalars['ID'];
};


export type MutationUpdateUserArgs = {
  details?: InputMaybe<UpdateUserDetails>;
};

export type NewGroupDetails = {
  description?: InputMaybe<Scalars['String']>;
  destination: Scalars['String'];
  endDate: Scalars['DateTime'];
  groupSize: Scalars['Int'];
  price: Scalars['Int'];
  startDate: Scalars['DateTime'];
  type: ReservationTypeEnum;
};

export type PaginationOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  group?: Maybe<Group>;
  groupReservations: Array<GroupReservation>;
  groupsByType: GroupsByTypePayload;
  myUser?: Maybe<User>;
  userReservations: Array<GroupReservation>;
};


export type QueryGroupArgs = {
  groupId: Scalars['ID'];
};


export type QueryGroupReservationsArgs = {
  groupId: Scalars['ID'];
};


export type QueryGroupsByTypeArgs = {
  dateFilters?: InputMaybe<DateFilters>;
  paginationOptions: PaginationOptions;
  type: ReservationTypeEnum;
};

/** Represents reservation type */
export enum ReservationTypeEnum {
  Holiday = 'HOLIDAY',
  Sightseeing = 'SIGHTSEEING',
  Universal = 'UNIVERSAL'
}

export type UpdateGroupDetails = {
  description?: InputMaybe<Scalars['String']>;
  destination: Scalars['String'];
  endDate?: InputMaybe<Scalars['DateTime']>;
  groupSize?: InputMaybe<Scalars['Int']>;
  price?: InputMaybe<Scalars['Int']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};

export type UpdateUserDetails = {
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['Phone']>;
};

export type User = {
  __typename?: 'User';
  admin?: Maybe<Admin>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['Email'];
  groupReservations: Array<GroupReservation>;
  id: Scalars['ID'];
  manager?: Maybe<Manager>;
  name: Scalars['String'];
  phone?: Maybe<Scalars['Phone']>;
  updatedAt: Scalars['DateTime'];
};
