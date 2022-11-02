import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { map } from 'ramda';

import { ManagerService } from '#Modules/Manager';
import { Manager } from '#GlobalTypes';

@Injectable({ scope: Scope.REQUEST })
export class ManagersDataLoader {
  constructor(private readonly managerService: ManagerService) {}

  generateDataLoader(): DataLoader<number, Manager> {
    return new DataLoader<number, Manager>(async (ids: number[]) => {
      const managers = await this.managerService.getManagerByIds(ids);
      const groupedByIds: { [id: number]: Manager } = {};
      managers.forEach((manager) => {
        groupedByIds[manager.id] = manager;
      });

      return map((id) => groupedByIds[id] || null, ids);
    });
  }
}
