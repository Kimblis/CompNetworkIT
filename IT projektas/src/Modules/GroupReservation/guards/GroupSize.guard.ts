import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-core';

import { GraphQLErrorCodes } from '#GraphQL';
import { GroupService } from '#Modules/Group';

@Injectable()
export class GroupSizeGuard implements CanActivate {
  constructor(private readonly groupService: GroupService) {}

  async canActivate(context: ExecutionContext) {
    const { groupId } = context.getArgByIndex(1);

    const group = await this.groupService.getGroupByIdOrFail(groupId);
    const groupReservations = await group.groupReservations;
    if (groupReservations.length + 1 > group.groupSize) {
      throw new ApolloError('Group size exceeded, please increase group size.', GraphQLErrorCodes.BAD_REQUEST);
    }

    return true;
  }
}
