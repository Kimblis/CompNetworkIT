import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { map } from 'ramda';

import { ManagerService } from '#Modules/Manager';
import { Manager } from '#GlobalTypes';

@Injectable({ scope: Scope.REQUEST })
export class ManagersByUserIdsDataLoader {
  constructor(private readonly managerService: ManagerService) {}

  generateDataLoader(): DataLoader<number, Manager> {
    return new DataLoader<number, Manager>(async (userIds: number[]) => {
      const managers = await this.managerService.getManagerByUserIds(userIds);
      const groupedByUserIds: { [userId: number]: Manager } = {};
      managers.forEach((manager) => {
        groupedByUserIds[manager.userId] = manager;
      });

      return map((userId) => groupedByUserIds[userId] || null, userIds);
    });
  }
}
