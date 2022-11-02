import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { map } from 'ramda';

import { GroupService } from '#Modules/Group';
import { Group } from '#GlobalTypes';

@Injectable({ scope: Scope.REQUEST })
export class GroupsByAdminIdsDataLoader {
  constructor(private readonly groupService: GroupService) {}

  generateDataLoader(): DataLoader<number, Group[]> {
    return new DataLoader<number, Group[]>(async (adminIds: number[]) => {
      const groups = await this.groupService.getGroupsByAdminIds(adminIds);
      const groupedByAdminIds: { [adminId: number]: Group[] } = {};
      groups.forEach((group) => {
        groupedByAdminIds[group.adminId] = groupedByAdminIds[group.adminId]
          ? [...groupedByAdminIds[group.adminId], group]
          : [group];
      });

      return map((adminId) => groupedByAdminIds[adminId] || [], adminIds);
    });
  }
}
