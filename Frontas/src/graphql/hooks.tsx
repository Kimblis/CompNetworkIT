import * as Types from './operationsTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;

export const LoginDocument = gql`
    mutation Login($email: Email!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<Types.LoginMutation, Types.LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<Types.LoginMutation, Types.LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.LoginMutation, Types.LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<Types.LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<Types.LoginMutation, Types.LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: Email!, $password: String!, $name: String!, $phone: Phone) {
  register(email: $email, password: $password, name: $name, phone: $phone) {
    accessToken
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<Types.RegisterMutation, Types.RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      name: // value for 'name'
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<Types.RegisterMutation, Types.RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.RegisterMutation, Types.RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<Types.RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<Types.RegisterMutation, Types.RegisterMutationVariables>;
export const CreateGroupDocument = gql`
    mutation CreateGroup($adminId: ID!, $details: NewGroupDetails!) {
  createNewGroup(adminId: $adminId, details: $details) {
    id
    type
    startDate
    endDate
    groupSize
    price
    description
    destination
  }
}
    `;
export type CreateGroupMutationFn = Apollo.MutationFunction<Types.CreateGroupMutation, Types.CreateGroupMutationVariables>;

/**
 * __useCreateGroupMutation__
 *
 * To run a mutation, you first call `useCreateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupMutation, { data, loading, error }] = useCreateGroupMutation({
 *   variables: {
 *      adminId: // value for 'adminId'
 *      details: // value for 'details'
 *   },
 * });
 */
export function useCreateGroupMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateGroupMutation, Types.CreateGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateGroupMutation, Types.CreateGroupMutationVariables>(CreateGroupDocument, options);
      }
export type CreateGroupMutationHookResult = ReturnType<typeof useCreateGroupMutation>;
export type CreateGroupMutationResult = Apollo.MutationResult<Types.CreateGroupMutation>;
export type CreateGroupMutationOptions = Apollo.BaseMutationOptions<Types.CreateGroupMutation, Types.CreateGroupMutationVariables>;
export const CreateNewReservationDocument = gql`
    mutation CreateNewReservation($groupId: ID!) {
  addNewGroupReservation(groupId: $groupId) {
    id
  }
}
    `;
export type CreateNewReservationMutationFn = Apollo.MutationFunction<Types.CreateNewReservationMutation, Types.CreateNewReservationMutationVariables>;

/**
 * __useCreateNewReservationMutation__
 *
 * To run a mutation, you first call `useCreateNewReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewReservationMutation, { data, loading, error }] = useCreateNewReservationMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useCreateNewReservationMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateNewReservationMutation, Types.CreateNewReservationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateNewReservationMutation, Types.CreateNewReservationMutationVariables>(CreateNewReservationDocument, options);
      }
export type CreateNewReservationMutationHookResult = ReturnType<typeof useCreateNewReservationMutation>;
export type CreateNewReservationMutationResult = Apollo.MutationResult<Types.CreateNewReservationMutation>;
export type CreateNewReservationMutationOptions = Apollo.BaseMutationOptions<Types.CreateNewReservationMutation, Types.CreateNewReservationMutationVariables>;
export const CancelReservationDocument = gql`
    mutation CancelReservation($reservationId: ID!) {
  cancelReservation(reservationId: $reservationId) {
    id
  }
}
    `;
export type CancelReservationMutationFn = Apollo.MutationFunction<Types.CancelReservationMutation, Types.CancelReservationMutationVariables>;

/**
 * __useCancelReservationMutation__
 *
 * To run a mutation, you first call `useCancelReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelReservationMutation, { data, loading, error }] = useCancelReservationMutation({
 *   variables: {
 *      reservationId: // value for 'reservationId'
 *   },
 * });
 */
export function useCancelReservationMutation(baseOptions?: Apollo.MutationHookOptions<Types.CancelReservationMutation, Types.CancelReservationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CancelReservationMutation, Types.CancelReservationMutationVariables>(CancelReservationDocument, options);
      }
export type CancelReservationMutationHookResult = ReturnType<typeof useCancelReservationMutation>;
export type CancelReservationMutationResult = Apollo.MutationResult<Types.CancelReservationMutation>;
export type CancelReservationMutationOptions = Apollo.BaseMutationOptions<Types.CancelReservationMutation, Types.CancelReservationMutationVariables>;
export const DeleteGroupDocument = gql`
    mutation DeleteGroup($groupId: ID!) {
  deleteGroup(groupId: $groupId)
}
    `;
export type DeleteGroupMutationFn = Apollo.MutationFunction<Types.DeleteGroupMutation, Types.DeleteGroupMutationVariables>;

/**
 * __useDeleteGroupMutation__
 *
 * To run a mutation, you first call `useDeleteGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGroupMutation, { data, loading, error }] = useDeleteGroupMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useDeleteGroupMutation(baseOptions?: Apollo.MutationHookOptions<Types.DeleteGroupMutation, Types.DeleteGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DeleteGroupMutation, Types.DeleteGroupMutationVariables>(DeleteGroupDocument, options);
      }
export type DeleteGroupMutationHookResult = ReturnType<typeof useDeleteGroupMutation>;
export type DeleteGroupMutationResult = Apollo.MutationResult<Types.DeleteGroupMutation>;
export type DeleteGroupMutationOptions = Apollo.BaseMutationOptions<Types.DeleteGroupMutation, Types.DeleteGroupMutationVariables>;
export const MyUserDocument = gql`
    query MyUser {
  myUser {
    id
    name
    admin {
      id
    }
    manager {
      id
    }
  }
}
    `;

/**
 * __useMyUserQuery__
 *
 * To run a query within a React component, call `useMyUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyUserQuery(baseOptions?: Apollo.QueryHookOptions<Types.MyUserQuery, Types.MyUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.MyUserQuery, Types.MyUserQueryVariables>(MyUserDocument, options);
      }
export function useMyUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.MyUserQuery, Types.MyUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.MyUserQuery, Types.MyUserQueryVariables>(MyUserDocument, options);
        }
export type MyUserQueryHookResult = ReturnType<typeof useMyUserQuery>;
export type MyUserLazyQueryHookResult = ReturnType<typeof useMyUserLazyQuery>;
export type MyUserQueryResult = Apollo.QueryResult<Types.MyUserQuery, Types.MyUserQueryVariables>;
export const GroupDocument = gql`
    query Group($groupId: ID!) {
  group(groupId: $groupId) {
    id
    type
    startDate
    endDate
    groupSize
    price
    description
    destination
    groupReservations {
      id
      user {
        id
        name
        email
        phone
      }
    }
  }
}
    `;

/**
 * __useGroupQuery__
 *
 * To run a query within a React component, call `useGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useGroupQuery(baseOptions: Apollo.QueryHookOptions<Types.GroupQuery, Types.GroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GroupQuery, Types.GroupQueryVariables>(GroupDocument, options);
      }
export function useGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GroupQuery, Types.GroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GroupQuery, Types.GroupQueryVariables>(GroupDocument, options);
        }
export type GroupQueryHookResult = ReturnType<typeof useGroupQuery>;
export type GroupLazyQueryHookResult = ReturnType<typeof useGroupLazyQuery>;
export type GroupQueryResult = Apollo.QueryResult<Types.GroupQuery, Types.GroupQueryVariables>;
export const GroupsDocument = gql`
    query Groups($type: ReservationTypeEnum!, $paginationOptions: PaginationOptions!, $dateFilters: DateFilters) {
  groupsByType(
    type: $type
    paginationOptions: $paginationOptions
    dateFilters: $dateFilters
  ) {
    count
    groups {
      id
      type
      startDate
      endDate
      groupSize
      price
      description
      destination
      groupReservations {
        id
        user {
          id
          name
          email
          phone
        }
      }
    }
  }
}
    `;

/**
 * __useGroupsQuery__
 *
 * To run a query within a React component, call `useGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupsQuery({
 *   variables: {
 *      type: // value for 'type'
 *      paginationOptions: // value for 'paginationOptions'
 *      dateFilters: // value for 'dateFilters'
 *   },
 * });
 */
export function useGroupsQuery(baseOptions: Apollo.QueryHookOptions<Types.GroupsQuery, Types.GroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GroupsQuery, Types.GroupsQueryVariables>(GroupsDocument, options);
      }
export function useGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GroupsQuery, Types.GroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GroupsQuery, Types.GroupsQueryVariables>(GroupsDocument, options);
        }
export type GroupsQueryHookResult = ReturnType<typeof useGroupsQuery>;
export type GroupsLazyQueryHookResult = ReturnType<typeof useGroupsLazyQuery>;
export type GroupsQueryResult = Apollo.QueryResult<Types.GroupsQuery, Types.GroupsQueryVariables>;
export const GroupReservationsDocument = gql`
    query GroupReservations($groupId: ID!) {
  groupReservations(groupId: $groupId) {
    id
    user {
      id
      name
      email
      phone
    }
  }
}
    `;

/**
 * __useGroupReservationsQuery__
 *
 * To run a query within a React component, call `useGroupReservationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupReservationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupReservationsQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useGroupReservationsQuery(baseOptions: Apollo.QueryHookOptions<Types.GroupReservationsQuery, Types.GroupReservationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GroupReservationsQuery, Types.GroupReservationsQueryVariables>(GroupReservationsDocument, options);
      }
export function useGroupReservationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GroupReservationsQuery, Types.GroupReservationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GroupReservationsQuery, Types.GroupReservationsQueryVariables>(GroupReservationsDocument, options);
        }
export type GroupReservationsQueryHookResult = ReturnType<typeof useGroupReservationsQuery>;
export type GroupReservationsLazyQueryHookResult = ReturnType<typeof useGroupReservationsLazyQuery>;
export type GroupReservationsQueryResult = Apollo.QueryResult<Types.GroupReservationsQuery, Types.GroupReservationsQueryVariables>;
export const UserReservationsDocument = gql`
    query UserReservations {
  userReservations {
    id
    group {
      id
      type
      startDate
      endDate
      groupSize
      price
      description
      destination
    }
  }
}
    `;

/**
 * __useUserReservationsQuery__
 *
 * To run a query within a React component, call `useUserReservationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserReservationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserReservationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserReservationsQuery(baseOptions?: Apollo.QueryHookOptions<Types.UserReservationsQuery, Types.UserReservationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.UserReservationsQuery, Types.UserReservationsQueryVariables>(UserReservationsDocument, options);
      }
export function useUserReservationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.UserReservationsQuery, Types.UserReservationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.UserReservationsQuery, Types.UserReservationsQueryVariables>(UserReservationsDocument, options);
        }
export type UserReservationsQueryHookResult = ReturnType<typeof useUserReservationsQuery>;
export type UserReservationsLazyQueryHookResult = ReturnType<typeof useUserReservationsLazyQuery>;
export type UserReservationsQueryResult = Apollo.QueryResult<Types.UserReservationsQuery, Types.UserReservationsQueryVariables>;