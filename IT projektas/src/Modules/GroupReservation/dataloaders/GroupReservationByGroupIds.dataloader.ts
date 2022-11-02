import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { map } from 'ramda';

import { GroupReservationService } from '#Modules/GroupReservation';
import { GroupReservation } from '#GlobalTypes';

@Injectable({ scope: Scope.REQUEST })
export class GroupReservationByGroupIdsDataLoader {
  constructor(private readonly groupReservationService: GroupReservationService) {}

  generateDataLoader(): DataLoader<number, GroupReservation[]> {
    return new DataLoader<number, GroupReservation[]>(async (groupIds: number[]) => {
      const reservations = await this.groupReservationService.getGroupReservationsByGroupIds(groupIds);
      const groupReservationsByGroupIds: { [groupId: number]: GroupReservation[] } = {};
      reservations.forEach((reservation) => {
        groupReservationsByGroupIds[reservation.groupId] = groupReservationsByGroupIds[reservation.groupId]
          ? [...groupReservationsByGroupIds[reservation.groupId], reservation]
          : [reservation];
      });

      return map((groupId) => groupReservationsByGroupIds[groupId] || [], groupIds);
    });
  }
}
