import { forwardRef, Module } from '@nestjs/common';

import { GroupReservationModule } from '#Modules/GroupReservation/GroupReservation.module';
import { AuthenticationModule } from '#Modules/Authentication/Authentication.module';
import { UserModule } from '#Modules/User/User.module';
import { TypeOrmCustomModule } from '#TypeORM/Utils';
import { AdminModule } from '#Modules/Admin/Admin.module';

import { GroupRelationsResolver } from './Group.resolver.relations';
import { GroupService } from './Group.service';
import * as GroupDataLoaders from './dataloaders';
import { GroupRepository } from './Group.repository';
import { GroupActionsResolver } from './Group.resolver.actions';

@Module({
  imports: [
    TypeOrmCustomModule.forCustomRepository([GroupRepository]),
    forwardRef(() => AuthenticationModule),
    forwardRef(() => UserModule),
    forwardRef(() => GroupReservationModule),
    forwardRef(() => AdminModule),
  ],
  providers: [GroupService, GroupRelationsResolver, GroupActionsResolver, ...Object.values(GroupDataLoaders)],
  exports: [GroupService],
})
export class GroupModule {}
