import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { map } from 'ramda';

import { GroupService } from '#Modules/Group';
import { Group } from '#GlobalTypes';

@Injectable({ scope: Scope.REQUEST })
export class GroupWithDeletedDataLoader {
  constructor(private readonly groupService: GroupService) {}

  generateDataLoader(): DataLoader<number, Group> {
    return new DataLoader<number, Group>(async (ids: number[]) => {
      const groups = await this.groupService.getGroupsByIdsWithDeleted(ids);
      const groupedByIds: { [id: number]: Group } = {};
      groups.forEach((group) => {
        groupedByIds[group.id] = group;
      });

      return map((id) => groupedByIds[id] || null, ids);
    });
  }
}
