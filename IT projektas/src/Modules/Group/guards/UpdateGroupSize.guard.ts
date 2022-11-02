import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-core';
import { In } from 'typeorm';

import { GraphQLErrorCodes } from '#GraphQL';
import { GroupService } from '#Modules/Group/Group.service';
import { GroupReservation } from '#Modules/GroupReservation';

@Injectable()
export class UpdateGroupSizeGuard implements CanActivate {
  constructor(private readonly groupService: GroupService) {}

  async canActivate(context: ExecutionContext) {
    const {
      groupId,
      details: { groupSize },
    } = context.getArgByIndex(1);

    const group = await this.groupService.getGroupByIdOrFail(groupId);
    const activeReservations = await GroupReservation.find({
      where: { groupId: group.id },
    });
    if (groupSize < activeReservations.length) {
      throw new ApolloError(
        'To lower group size to this number- you must cancel some reservations first',
        GraphQLErrorCodes.BAD_REQUEST,
      );
    }

    return true;
  }
}
