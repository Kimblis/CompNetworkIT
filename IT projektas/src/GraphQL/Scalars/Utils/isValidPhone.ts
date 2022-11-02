import { ApolloError } from 'apollo-server-core';
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';

import { GraphQLErrorCodes } from '#GraphQL';

const phoneUtil = PhoneNumberUtil.getInstance();

export const isValidPhone = (value: string) => {
  const prefixes = ['+451010'];
  const number = phoneUtil.parseAndKeepRawInput(value);

  if (phoneUtil.isValidNumber(number)) {
    return phoneUtil.format(number, PhoneNumberFormat.E164);
  }

  const doesAnyMatch = prefixes.find((prefix) => value.startsWith(prefix));

  if (!doesAnyMatch) {
    throw new ApolloError(`Value "${value}" is not a valid phone number`, GraphQLErrorCodes.BAD_REQUEST);
  }

  return phoneUtil.format(number, PhoneNumberFormat.E164);
};
