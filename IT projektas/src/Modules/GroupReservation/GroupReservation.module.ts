import { forwardRef, Module } from '@nestjs/common';

import { UserModule } from '#Modules/User/User.module';
import { AuthenticationModule } from '#Modules/Authentication/Authentication.module';
import { GroupModule } from '#Modules/Group/Group.module';
import { TypeOrmCustomModule } from '#TypeORM/Utils';

import { GroupReservationRelationsResolver } from './GroupReservation.resolver.relations';
import { GroupReservationService } from './GroupReservation.service';
import * as GroupReservationDataLoaders from './dataloaders';
import { GroupReservationRepository } from './GroupReservation.repository';
import { GroupReservationActionsResolver } from './GroupReservation.resolver.actions';

@Module({
  imports: [
    TypeOrmCustomModule.forCustomRepository([GroupReservationRepository]),
    forwardRef(() => AuthenticationModule),
    forwardRef(() => UserModule),
    forwardRef(() => GroupModule),
  ],
  providers: [
    GroupReservationService,
    GroupReservationRelationsResolver,
    GroupReservationActionsResolver,
    ...Object.values(GroupReservationDataLoaders),
  ],
  exports: [GroupReservationService],
})
export class GroupReservationModule {}
