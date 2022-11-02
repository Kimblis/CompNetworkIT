import { Module } from '@nestjs/common';

import { CryptographyService } from './Cryptography.service';
import { JwtCryptographyService } from './JWTCryptography.service';

@Module({
  providers: [JwtCryptographyService, CryptographyService],
  exports: [JwtCryptographyService, CryptographyService],
})
export class CryptographyModule {}
