import { Scalar, CustomScalar } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-core';
import { ValueNode, Kind } from 'graphql';

import { GraphQLErrorCodes } from '#GraphQL';

import { isValidEmail } from './Utils';

@Scalar('Email', () => Email)
export class Email implements CustomScalar<string, string> {
  description =
    'A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/.';

  parseValue(value: string) {
    return isValidEmail(value);
  }

  serialize(value: string) {
    return isValidEmail(value);
  }

  parseLiteral(ast: ValueNode) {
    if (ast.kind !== Kind.STRING) {
      throw new ApolloError(`Can only validate string as Email but got a: ${ast.kind}`, GraphQLErrorCodes.BAD_REQUEST);
    }

    return isValidEmail(ast.value);
  }
}
