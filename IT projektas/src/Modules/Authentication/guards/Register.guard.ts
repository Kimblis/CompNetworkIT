import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-core';

import { UserService } from '#Modules/User';
import { GraphQLErrorCodes } from '#GraphQL';

@Injectable()
export class RegisterGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { email } = context.getArgByIndex(1);
    const user = await this.userService.findUserByEmail(email);
    if (user) {
      throw new ApolloError('User with provided email already exists', GraphQLErrorCodes.BAD_REQUEST);
    }

    return true;
  }
}
