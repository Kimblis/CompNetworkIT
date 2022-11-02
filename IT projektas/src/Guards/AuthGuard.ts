import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-core';

import { AuthenticationService } from '#Modules/Authentication/Authentication.service';
import { GraphQLErrorCodes, GraphQLErrorMessages } from '#GraphQL';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authenticationService: AuthenticationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { req } = GqlExecutionContext.create(context).getContext();
    const { authorization } = req.headers;

    if (!authorization) {
      throw new ApolloError(GraphQLErrorMessages.UNAUTHENTICATED, GraphQLErrorCodes.AUTHENTICATION_ERROR);
    }

    const user = await this.authenticationService.authenticateUser(authorization);
    if (!user) {
      throw new ApolloError(GraphQLErrorMessages.UNAUTHENTICATED, GraphQLErrorCodes.AUTHENTICATION_ERROR);
    }

    req.user = user;

    return true;
  }
}
