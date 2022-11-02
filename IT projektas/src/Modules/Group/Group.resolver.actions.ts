import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { DateFilters, PaginationOptions } from '#GraphQL/Inputs';
import { AuthGuard } from '#Guards';
import { Admin, ReservationTypeEnum } from '#GlobalTypes';
import { ArgsValidationPipe, DatesValidationPipe, UpdateValidationPipe } from '#Pipes';
import { ExistingAdminValidationPipe } from '#Modules/Admin/pipes';

import { GroupService } from './Group.service';
import { GroupModel, GroupsByTypePayload } from './models';
import { NewGroupDetails, UpdateGroupDetails } from './inputs';
import { ExistingGroupValidationPipe } from './pipes';
import { GroupAdminGuard, UpdateGroupSizeGuard } from './guards';
import { Group } from './Group.entity';

@Resolver()
export class GroupActionsResolver {
  constructor(private readonly groupService: GroupService) {}

  @Query(() => GroupModel, { nullable: true })
  group(@Args('groupId', { type: () => ID }) groupId: number) {
    return this.groupService.getGroupByIdOrFail(groupId);
  }

  @Query(() => GroupsByTypePayload)
  groupsByType(
    @Args('type', { type: () => ReservationTypeEnum }) type: ReservationTypeEnum,
    @Args('paginationOptions', { type: () => PaginationOptions }) paginationOptions: PaginationOptions,
    @Args('dateFilters', { type: () => DateFilters, nullable: true }, DatesValidationPipe) dateFilters: DateFilters | null,
  ) {
    return this.groupService.getGroupsByDateRangeAndType(type, paginationOptions, dateFilters);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => GroupModel)
  createNewGroup(
    @Args('adminId', { type: () => ID }, ExistingAdminValidationPipe) admin: Admin,
    @Args('details', { type: () => NewGroupDetails }, UpdateValidationPipe, ArgsValidationPipe, DatesValidationPipe)
    details: NewGroupDetails,
  ) {
    return this.groupService.createNewGroup(details, admin);
  }

  @UseGuards(AuthGuard, GroupAdminGuard, UpdateGroupSizeGuard)
  @Mutation(() => GroupModel)
  updateGroupDetails(
    @Args('groupId', { type: () => ID }, ExistingGroupValidationPipe) group: Group,
    @Args('details', { type: () => UpdateGroupDetails }, UpdateValidationPipe, DatesValidationPipe) details: UpdateGroupDetails,
  ) {
    return this.groupService.updateGroupDetails(group, details);
  }

  @UseGuards(AuthGuard, GroupAdminGuard)
  @Mutation(() => Boolean)
  deleteGroup(@Args('groupId', { type: () => ID }, ExistingGroupValidationPipe) group: Group) {
    return this.groupService.deleteGroup(group);
  }
}
