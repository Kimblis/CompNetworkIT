import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { map } from 'ramda';

import { UserService } from '#Modules/User';
import { User } from '#GlobalTypes';

@Injectable({ scope: Scope.REQUEST })
export class UserDataLoader {
  constructor(private readonly userService: UserService) {}

  generateDataLoader(): DataLoader<number, User> {
    return new DataLoader<number, User>(async (ids: number[]) => {
      const users = await this.userService.findUsersByIds(ids);
      const groupedByIds: { [id: number]: User } = {};
      users.forEach((user) => {
        groupedByIds[user.id] = user;
      });

      return map((id) => groupedByIds[id] || null, ids);
    });
  }
}
