import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ApolloError } from 'apollo-server-core';

import { GraphQLErrorCodes } from '#GraphQL';

@Injectable()
export class ArgsValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!value) {
      return;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const err = errors
        .map((e) => {
          const constraints = Object.values(e.constraints);
          return constraints.map((c) => c.charAt(0).toUpperCase() + c.slice(1)).join(', ');
        })
        .join(', ');

      throw new ApolloError(err, GraphQLErrorCodes.BAD_REQUEST);
    }

    return value;
  }
}
