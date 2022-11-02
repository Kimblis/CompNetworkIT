import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { User, UserService } from '#Modules/User';
import { GroupService } from '#Modules/Group';
import { GraphQLErrorCodes, GraphQLErrorMessages } from '#GraphQL';
import { AdminService } from '#Modules/Admin';

@Injectable()
export class GroupAdminGuard implements CanActivate {
  constructor(private readonly groupService: GroupService, private readonly adminService: AdminService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { req } = GqlExecutionContext.create(context).getContext();
    const { groupId } = context.getArgByIndex(1);
    const group = await this.groupService.getGroupByIdOrFail(groupId);
    const admin = await this.adminService.getAdminByIdOrFail(group.adminId);
    const { id: executorId } = req.user as User;

    if (admin.userId !== executorId) {
      throw new ApolloError(GraphQLErrorMessages.UNAUTHORIZED, GraphQLErrorCodes.UNAUTHORIZED);
    }

    return true;
  }
}
