import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { map } from 'ramda';

import { GroupReservationService } from '#Modules/GroupReservation';
import { GroupReservation } from '#GlobalTypes';

@Injectable({ scope: Scope.REQUEST })
export class GroupReservationByUserIdsDataLoader {
  constructor(private readonly groupReservationService: GroupReservationService) {}

  generateDataLoader(): DataLoader<number, GroupReservation[]> {
    return new DataLoader<number, GroupReservation[]>(async (userIds: number[]) => {
      const reservations = await this.groupReservationService.getGroupReservationsByUserIds(userIds);
      const groupReservationsByUserIds: { [userId: number]: GroupReservation[] } = {};
      reservations.forEach((reservation) => {
        groupReservationsByUserIds[reservation.userId] = groupReservationsByUserIds[reservation.userId]
          ? [...groupReservationsByUserIds[reservation.userId], reservation]
          : [reservation];
      });

      return map((userId) => groupReservationsByUserIds[userId] || [], userIds);
    });
  }
}
