import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { map } from 'ramda';

import { AdminService } from '#Modules/Admin';
import { Admin } from '#GlobalTypes';

@Injectable({ scope: Scope.REQUEST })
export class AdminsByUserIdsDataLoader {
  constructor(private readonly adminService: AdminService) {}

  generateDataLoader(): DataLoader<number, Admin> {
    return new DataLoader<number, Admin>(async (userIds: number[]) => {
      const admins = await this.adminService.getAdminsByUserIds(userIds);
      const groupedByUserIds: { [userId: number]: Admin } = {};
      admins.forEach((admin) => {
        groupedByUserIds[admin.userId] = admin;
      });

      return map((userId) => groupedByUserIds[userId] || null, userIds);
    });
  }
}
