import { ApolloError } from 'apollo-server-core';

import { GraphQLErrorCodes } from '#GraphQL/types';

const EMAIL_ADDRESS_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const isValidEmail = (value: string) => {
  if (typeof value !== 'string') {
    throw new ApolloError('Email should be a string!', GraphQLErrorCodes.BAD_REQUEST);
  }

  if (!EMAIL_ADDRESS_REGEX.test(value)) {
    throw new ApolloError(`Value "${value}" does not match an email address structure`, GraphQLErrorCodes.BAD_REQUEST);
  }

  return value;
};
