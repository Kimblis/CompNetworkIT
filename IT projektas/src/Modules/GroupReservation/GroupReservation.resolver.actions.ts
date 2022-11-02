import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthGuard } from '#Guards';
import { Group, GroupReservation, User } from '#GlobalTypes';
import { ExistingGroupValidationPipe } from '#Modules/Group/pipes';
import { UserContext } from '#Decorators';

import { GroupReservationService } from './GroupReservation.service';
import { GroupReservationModel } from './models';
import { ChangeReservationStatusGuard, GroupSizeGuard } from './guards';
import { ExistingGroupReservationValidationPipe } from './pipes';

@Resolver()
export class GroupReservationActionsResolver {
  constructor(private readonly groupReservationService: GroupReservationService) {}

  @Query(() => [GroupReservationModel])
  groupReservations(@Args('groupId', { type: () => ID }) groupId: number) {
    return this.groupReservationService.getGroupReservations(groupId);
  }

  @UseGuards(AuthGuard)
  @Query(() => [GroupReservationModel])
  userReservations(@UserContext() { id: clientId }: User) {
    return this.groupReservationService.getUserReservations(clientId);
  }

  @UseGuards(AuthGuard, GroupSizeGuard)
  @Mutation(() => GroupReservationModel)
  async addNewGroupReservation(
    @Args('groupId', { type: () => ID }, ExistingGroupValidationPipe) group: Group,
    @UserContext() { id: clientId }: User,
  ) {
    return this.groupReservationService.createGroupReservations(group, clientId);
  }

  @UseGuards(AuthGuard, ChangeReservationStatusGuard)
  @Mutation(() => GroupReservationModel)
  cancelReservation(
    @Args('reservationId', { type: () => ID }, ExistingGroupReservationValidationPipe) reservation: GroupReservation,
  ) {
    return this.groupReservationService.cancelReservation(reservation);
  }
}
