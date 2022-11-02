import { CustomScalar, Scalar } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-core';
import { ValueNode, Kind } from 'graphql';

import { GraphQLErrorCodes } from '#GraphQL';

import { isValidPhone } from './Utils';

@Scalar('Phone', () => Phone)
export class Phone implements CustomScalar<string, string> {
  description = 'The `Phone` scalar type represents valid Phone values';

  parseValue(value: string) {
    return isValidPhone(value);
  }

  serialize(value: string) {
    return isValidPhone(value);
  }

  parseLiteral(ast: ValueNode) {
    if (ast.kind !== Kind.STRING) {
      throw new ApolloError(`Can only validate string as Phone but got a: ${ast.kind}`, GraphQLErrorCodes.BAD_REQUEST);
    }

    return isValidPhone(ast.value);
  }
}
