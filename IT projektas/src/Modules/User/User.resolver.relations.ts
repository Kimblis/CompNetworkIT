import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';

import { Loader } from '#Decorators';
import { Admin, GroupReservation, Manager, User } from '#GlobalTypes';
import { AdminModel } from '#Modules/Admin/models';
import { AdminsByUserIdsDataLoader } from '#Modules/Admin/dataloaders';
import { GroupReservationByUserIdsDataLoader } from '#Modules/GroupReservation/dataloaders';
import { GroupReservationModel } from '#Modules/GroupReservation/models';
import { ManagerModel } from '#Modules/Manager/models';
import { ManagersByUserIdsDataLoader } from '#Modules/Manager/dataloaders';

import { UserModel } from './models';

@Resolver(() => UserModel)
export class UserRelationsResolver {
  @ResolveField(() => AdminModel, { nullable: true })
  admin(
    @Parent() { id }: User,
    @Loader(AdminsByUserIdsDataLoader)
    adminsLoader: DataLoader<number, Admin>,
  ): Promise<Admin> {
    return adminsLoader.load(id);
  }

  @ResolveField(() => ManagerModel, { nullable: true })
  manager(
    @Parent() { id }: User,
    @Loader(ManagersByUserIdsDataLoader)
    managersLoader: DataLoader<number, Manager>,
  ): Promise<Manager> {
    return managersLoader.load(id);
  }

  @ResolveField(() => GroupReservationModel)
  groupReservations(
    @Parent() { id }: User,
    @Loader(GroupReservationByUserIdsDataLoader)
    groupReservationLoader: DataLoader<number, GroupReservation[]>,
  ): Promise<GroupReservation[]> {
    return groupReservationLoader.load(id);
  }
}
