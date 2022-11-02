import { Module, forwardRef } from '@nestjs/common';

import { UserModule } from '#Modules/User/User.module';
import { CryptographyModule } from '#Modules/Cryptography/Cryptography.module';

import { AuthenticationResolver } from './Authentication.resolver';
import { AuthenticationService } from './Authentication.service';

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => CryptographyModule)],
  providers: [AuthenticationService, AuthenticationResolver],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
