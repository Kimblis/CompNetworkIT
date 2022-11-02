import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { map } from 'ramda';

import { GroupReservationService } from '#Modules/GroupReservation';
import { GroupReservation } from '#GlobalTypes';

@Injectable({ scope: Scope.REQUEST })
export class GroupReservationWithDeletedDataLoader {
  constructor(private readonly groupReservationService: GroupReservationService) {}

  generateDataLoader(): DataLoader<number, GroupReservation> {
    return new DataLoader<number, GroupReservation>(async (ids: number[]) => {
      const reservations = await this.groupReservationService.getGroupReservationsByIdsWithDeleted(ids);
      const groupedByIds: { [id: number]: GroupReservation } = {};
      reservations.forEach((reservation) => {
        groupedByIds[reservation.id] = reservation;
      });

      return map((id) => groupedByIds[id] || null, ids);
    });
  }
}
