import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type AdminKeySpecifier = ('createdAt' | 'deletedAt' | 'id' | 'updatedAt' | 'user' | AdminKeySpecifier)[];
export type AdminFieldPolicy = {
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  deletedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type GroupKeySpecifier = (
  | 'admin'
  | 'createdAt'
  | 'description'
  | 'destination'
  | 'endDate'
  | 'groupReservations'
  | 'groupSize'
  | 'id'
  | 'price'
  | 'startDate'
  | 'type'
  | 'updatedAt'
  | GroupKeySpecifier
)[];
export type GroupFieldPolicy = {
  admin?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  destination?: FieldPolicy<any> | FieldReadFunction<any>;
  endDate?: FieldPolicy<any> | FieldReadFunction<any>;
  groupReservations?: FieldPolicy<any> | FieldReadFunction<any>;
  groupSize?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  price?: FieldPolicy<any> | FieldReadFunction<any>;
  startDate?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type GroupReservationKeySpecifier = (
  | 'createdAt'
  | 'deletedAt'
  | 'group'
  | 'id'
  | 'updatedAt'
  | 'user'
  | GroupReservationKeySpecifier
)[];
export type GroupReservationFieldPolicy = {
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  deletedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  group?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type GroupsByTypePayloadKeySpecifier = ('count' | 'groups' | GroupsByTypePayloadKeySpecifier)[];
export type GroupsByTypePayloadFieldPolicy = {
  count?: FieldPolicy<any> | FieldReadFunction<any>;
  groups?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LoginPayloadKeySpecifier = ('accessToken' | LoginPayloadKeySpecifier)[];
export type LoginPayloadFieldPolicy = {
  accessToken?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ManagerKeySpecifier = ('createdAt' | 'deletedAt' | 'id' | 'updatedAt' | 'user' | ManagerKeySpecifier)[];
export type ManagerFieldPolicy = {
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  deletedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MutationKeySpecifier = (
  | 'addNewGroupReservation'
  | 'cancelReservation'
  | 'createNewGroup'
  | 'deleteGroup'
  | 'login'
  | 'register'
  | 'updateGroupDetails'
  | 'updateUser'
  | MutationKeySpecifier
)[];
export type MutationFieldPolicy = {
  addNewGroupReservation?: FieldPolicy<any> | FieldReadFunction<any>;
  cancelReservation?: FieldPolicy<any> | FieldReadFunction<any>;
  createNewGroup?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteGroup?: FieldPolicy<any> | FieldReadFunction<any>;
  login?: FieldPolicy<any> | FieldReadFunction<any>;
  register?: FieldPolicy<any> | FieldReadFunction<any>;
  updateGroupDetails?: FieldPolicy<any> | FieldReadFunction<any>;
  updateUser?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type QueryKeySpecifier = (
  | 'group'
  | 'groupReservations'
  | 'groupsByType'
  | 'myUser'
  | 'userReservations'
  | QueryKeySpecifier
)[];
export type QueryFieldPolicy = {
  group?: FieldPolicy<any> | FieldReadFunction<any>;
  groupReservations?: FieldPolicy<any> | FieldReadFunction<any>;
  groupsByType?: FieldPolicy<any> | FieldReadFunction<any>;
  myUser?: FieldPolicy<any> | FieldReadFunction<any>;
  userReservations?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserKeySpecifier = (
  | 'admin'
  | 'createdAt'
  | 'deletedAt'
  | 'email'
  | 'groupReservations'
  | 'id'
  | 'manager'
  | 'name'
  | 'phone'
  | 'updatedAt'
  | UserKeySpecifier
)[];
export type UserFieldPolicy = {
  admin?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  deletedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  email?: FieldPolicy<any> | FieldReadFunction<any>;
  groupReservations?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  manager?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  phone?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type StrictTypedTypePolicies = {
  Admin?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | AdminKeySpecifier | (() => undefined | AdminKeySpecifier);
    fields?: AdminFieldPolicy;
  };
  Group?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | GroupKeySpecifier | (() => undefined | GroupKeySpecifier);
    fields?: GroupFieldPolicy;
  };
  GroupReservation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | GroupReservationKeySpecifier | (() => undefined | GroupReservationKeySpecifier);
    fields?: GroupReservationFieldPolicy;
  };
  GroupsByTypePayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | GroupsByTypePayloadKeySpecifier | (() => undefined | GroupsByTypePayloadKeySpecifier);
    fields?: GroupsByTypePayloadFieldPolicy;
  };
  LoginPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | LoginPayloadKeySpecifier | (() => undefined | LoginPayloadKeySpecifier);
    fields?: LoginPayloadFieldPolicy;
  };
  Manager?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | ManagerKeySpecifier | (() => undefined | ManagerKeySpecifier);
    fields?: ManagerFieldPolicy;
  };
  Mutation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier);
    fields?: MutationFieldPolicy;
  };
  Query?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier);
    fields?: QueryFieldPolicy;
  };
  User?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier);
    fields?: UserFieldPolicy;
  };
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;
