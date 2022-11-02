import * as Types from './types';

export type LoginMutationVariables = Types.Exact<{
  email: Types.Scalars['Email'];
  password: Types.Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginPayload', accessToken: string } };

export type RegisterMutationVariables = Types.Exact<{
  email: Types.Scalars['Email'];
  password: Types.Scalars['String'];
  name: Types.Scalars['String'];
  phone?: Types.InputMaybe<Types.Scalars['Phone']>;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'LoginPayload', accessToken: string } };

export type CreateGroupMutationVariables = Types.Exact<{
  adminId: Types.Scalars['ID'];
  details: Types.NewGroupDetails;
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createNewGroup: { __typename?: 'Group', id: string, type: Types.ReservationTypeEnum, startDate: string, endDate: string, groupSize: number, price?: number | null, description?: string | null, destination: string } };

export type CreateNewReservationMutationVariables = Types.Exact<{
  groupId: Types.Scalars['ID'];
}>;


export type CreateNewReservationMutation = { __typename?: 'Mutation', addNewGroupReservation: { __typename?: 'GroupReservation', id: string } };

export type CancelReservationMutationVariables = Types.Exact<{
  reservationId: Types.Scalars['ID'];
}>;


export type CancelReservationMutation = { __typename?: 'Mutation', cancelReservation: { __typename?: 'GroupReservation', id: string } };

export type DeleteGroupMutationVariables = Types.Exact<{
  groupId: Types.Scalars['ID'];
}>;


export type DeleteGroupMutation = { __typename?: 'Mutation', deleteGroup: boolean };

export type MyUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MyUserQuery = { __typename?: 'Query', myUser?: { __typename?: 'User', id: string, name: string, admin?: { __typename?: 'Admin', id: string } | null, manager?: { __typename?: 'Manager', id: string } | null } | null };

export type GroupQueryVariables = Types.Exact<{
  groupId: Types.Scalars['ID'];
}>;


export type GroupQuery = { __typename?: 'Query', group?: { __typename?: 'Group', id: string, type: Types.ReservationTypeEnum, startDate: string, endDate: string, groupSize: number, price?: number | null, description?: string | null, destination: string, groupReservations: Array<{ __typename?: 'GroupReservation', id: string, user?: { __typename?: 'User', id: string, name: string, email: string, phone?: string | null } | null }> } | null };

export type GroupsQueryVariables = Types.Exact<{
  type: Types.ReservationTypeEnum;
  paginationOptions: Types.PaginationOptions;
  dateFilters?: Types.InputMaybe<Types.DateFilters>;
}>;


export type GroupsQuery = { __typename?: 'Query', groupsByType: { __typename?: 'GroupsByTypePayload', count: number, groups: Array<{ __typename?: 'Group', id: string, type: Types.ReservationTypeEnum, startDate: string, endDate: string, groupSize: number, price?: number | null, description?: string | null, destination: string, groupReservations: Array<{ __typename?: 'GroupReservation', id: string, user?: { __typename?: 'User', id: string, name: string, email: string, phone?: string | null } | null }> }> } };

export type GroupReservationsQueryVariables = Types.Exact<{
  groupId: Types.Scalars['ID'];
}>;


export type GroupReservationsQuery = { __typename?: 'Query', groupReservations: Array<{ __typename?: 'GroupReservation', id: string, user?: { __typename?: 'User', id: string, name: string, email: string, phone?: string | null } | null }> };

export type UserReservationsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserReservationsQuery = { __typename?: 'Query', userReservations: Array<{ __typename?: 'GroupReservation', id: string, group: { __typename?: 'Group', id: string, type: Types.ReservationTypeEnum, startDate: string, endDate: string, groupSize: number, price?: number | null, description?: string | null, destination: string } }> };
