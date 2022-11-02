import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-core';

import { UserService } from '#Modules/User';
import { CryptographyService } from '#Modules/Cryptography';
import { GraphQLErrorCodes, GraphQLErrorMessages } from '#GraphQL';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private userService: UserService, private cryptographyService: CryptographyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { req } = GqlExecutionContext.create(context).getContext();
    const { email, password } = context.getArgByIndex(1);

    const user = await this.userService.findUserByEmail(email);
    if (!user?.password) {
      throw new ApolloError(GraphQLErrorMessages.INVALID_CREDENTIALS, GraphQLErrorCodes.BAD_REQUEST);
    }

    const passwordsMatch = await this.cryptographyService.compare(password, user.password);
    if (!passwordsMatch) {
      throw new ApolloError(GraphQLErrorMessages.INVALID_CREDENTIALS, GraphQLErrorCodes.BAD_REQUEST);
    }

    req.user = user;

    return true;
  }
}
