import { Module, forwardRef } from '@nestjs/common';

import { AuthenticationModule } from '#Modules/Authentication/Authentication.module';
import { UserModule } from '#Modules/User/User.module';
import { TypeOrmCustomModule } from '#TypeORM/Utils';

import { AdminService } from './Admin.service';
import { AdminRelationsResolver } from './Admin.resolver.relations';
import * as AdminDataLoader from './dataloaders';
import { AdminRepository } from './Admin.repository';

@Module({
  imports: [
    TypeOrmCustomModule.forCustomRepository([AdminRepository]),
    forwardRef(() => AuthenticationModule),
    forwardRef(() => UserModule),
  ],
  providers: [AdminService, AdminRelationsResolver, ...Object.values(AdminDataLoader)],
  exports: [AdminService],
})
export class AdminModule {}
