import { Module, forwardRef } from '@nestjs/common';

import { AuthenticationModule } from '#Modules/Authentication/Authentication.module';
import { UserModule } from '#Modules/User/User.module';
import { TypeOrmCustomModule } from '#TypeORM/Utils';

import * as ManagerDataLoader from './dataloaders';
import { ManagerRepository } from './Manager.repository';
import { ManagerService } from './Manager.service';
import { ManagerRelationsResolver } from './Manager.resolver.relations';

@Module({
  imports: [
    TypeOrmCustomModule.forCustomRepository([ManagerRepository]),
    forwardRef(() => AuthenticationModule),
    forwardRef(() => UserModule),
  ],
  providers: [ManagerService, ManagerRelationsResolver, ...Object.values(ManagerDataLoader)],
  exports: [ManagerService],
})
export class ManagerModule {}
