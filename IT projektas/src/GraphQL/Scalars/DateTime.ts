import { Scalar } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-core';
import { ValueNode, Kind } from 'graphql';

import { GraphQLErrorCodes } from '#GraphQL';

@Scalar('DateTime', () => DateTime)
export class DateTime {
  description = 'A date and time, represented as an ISO-8601 string';

  parseValue(value: string) {
    return new Date(value);
  }

  serialize(value: string) {
    return new Date(value).toISOString();
  }

  parseLiteral(ast: ValueNode) {
    if (ast.kind !== Kind.STRING) {
      throw new ApolloError(`Can only validate string as DateTime but got a: ${ast.kind}`, GraphQLErrorCodes.BAD_REQUEST);
    }

    return new Date(ast.value);
  }
}
