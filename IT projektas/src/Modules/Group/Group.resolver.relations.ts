import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';

import { Loader } from '#Decorators';
import { Group, GroupReservation, Admin } from '#GlobalTypes';
import { GroupReservationModel } from '#Modules/GroupReservation/models';
import { GroupReservationByGroupIdsDataLoader } from '#Modules/GroupReservation/dataloaders';
import { AdminModel } from '#Modules/Admin/models';
import { AdminsDataLoader } from '#Modules/Admin/dataloaders';

import { GroupModel } from './models';

@Resolver(() => GroupModel)
export class GroupRelationsResolver {
  @ResolveField(() => AdminModel)
  admin(
    @Parent() { adminId }: Group,
    @Loader(AdminsDataLoader)
    adminsLoader: DataLoader<number, Admin>,
  ): Promise<Admin> {
    return adminsLoader.load(adminId);
  }

  @ResolveField(() => GroupReservationModel)
  groupReservations(
    @Parent() { id }: Group,
    @Loader(GroupReservationByGroupIdsDataLoader)
    reservationsLoader: DataLoader<number, GroupReservation[]>,
  ): Promise<GroupReservation[]> {
    return reservationsLoader.load(id);
  }
}
