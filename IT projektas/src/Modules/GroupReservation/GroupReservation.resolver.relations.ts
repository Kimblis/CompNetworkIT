import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';

import { Loader } from '#Decorators';
import { Group, GroupReservation, User } from '#GlobalTypes';
import { GroupModel } from '#Modules/Group/models';
import { GroupWithDeletedDataLoader } from '#Modules/Group/dataloaders';
import { UserModel } from '#Modules/User/models';
import { UserDataLoader } from '#Modules/User/dataloaders';

import { GroupReservationModel } from './models';

@Resolver(() => GroupReservationModel)
export class GroupReservationRelationsResolver {
  @ResolveField(() => GroupModel)
  group(
    @Parent() { groupId }: GroupReservation,
    @Loader(GroupWithDeletedDataLoader)
    groupsLoader: DataLoader<number, Group>,
  ): Promise<Group> {
    return groupsLoader.load(groupId);
  }

  @ResolveField(() => UserModel)
  user(
    @Parent() { userId }: GroupReservation,
    @Loader(UserDataLoader)
    usersLoader: DataLoader<number, User>,
  ): Promise<User> {
    return userId ? usersLoader.load(userId) : null;
  }
}
