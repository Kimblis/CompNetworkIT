import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { User, UserService } from '#Modules/User';
import { GroupReservationService } from '#Modules/GroupReservation';
import { GraphQLErrorCodes, GraphQLErrorMessages } from '#GraphQL';

@Injectable()
export class ChangeReservationStatusGuard implements CanActivate {
  constructor(private readonly groupReservationService: GroupReservationService, private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { req } = GqlExecutionContext.create(context).getContext();
    const { reservationId } = context.getArgByIndex(1);
    const groupReservation = await this.groupReservationService.getGroupReservationByIdOrFail(reservationId);
    const group = await groupReservation.group;
    const groupAdmin = group ? await group.admin : null;
    const { id: executorId } = req.user as User;

    if (groupAdmin.userId != executorId && groupReservation.userId != executorId) {
      throw new ApolloError(GraphQLErrorMessages.UNAUTHORIZED, GraphQLErrorCodes.UNAUTHORIZED);
    }

    return true;
  }
}
