import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { map } from 'ramda';

import { AdminService } from '#Modules/Admin';
import { Admin } from '#GlobalTypes';

@Injectable({ scope: Scope.REQUEST })
export class AdminsDataLoader {
  constructor(private readonly adminService: AdminService) {}

  generateDataLoader(): DataLoader<number, Admin> {
    return new DataLoader<number, Admin>(async (ids: number[]) => {
      const admins = await this.adminService.getAdminsByIds(ids);
      const groupedByIds: { [id: number]: Admin } = {};
      admins.forEach((admin) => {
        groupedByIds[admin.id] = admin;
      });

      return map((id) => groupedByIds[id] || null, ids);
    });
  }
}
