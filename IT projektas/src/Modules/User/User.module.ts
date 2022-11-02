import { forwardRef, Module } from '@nestjs/common';

import { AuthenticationModule } from '#Modules/Authentication/Authentication.module';
import { CryptographyModule } from '#Modules/Cryptography/Cryptography.module';
import { TypeOrmCustomModule } from '#TypeORM/Utils';

import { UserService } from './User.service';
import { UserActionsResolver } from './User.resolver.actions';
import { UserDataLoader } from './dataloaders';
import { UserRepository } from './User.repository';
import { UserRelationsResolver } from './User.resolver.relations';

@Module({
  imports: [
    TypeOrmCustomModule.forCustomRepository([UserRepository]),
    CryptographyModule,
    forwardRef(() => AuthenticationModule),
  ],
  providers: [UserService, UserActionsResolver, UserRelationsResolver, UserDataLoader],
  exports: [UserService],
})
export class UserModule {}
