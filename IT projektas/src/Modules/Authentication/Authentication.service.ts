import { Injectable } from '@nestjs/common';

import { JwtCryptographyService, CryptographyService } from '#Modules/Cryptography';
import { User, UserService } from '#Modules/User';

import { Register } from './types';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtCryptographyService: JwtCryptographyService,
    private readonly cryptographyService: CryptographyService,
    private readonly userService: UserService,
  ) {}

  public async register(data: Register) {
    const encryptedPassword = await this.cryptographyService.encrypt(data.password);
    const user = await this.userService.createNewUser({ ...data, password: encryptedPassword });
    const accessToken = this.jwtCryptographyService.encrypt(user.id);
    return {
      accessToken,
    };
  }

  public authenticateUser(authToken: string) {
    const { userId } = this.jwtCryptographyService.decrypt(authToken);

    return this.userService.findUserById(userId);
  }

  public loginWithPassword({ id: userId }: User) {
    const accessToken = this.jwtCryptographyService.encrypt(userId);
    return {
      accessToken,
    };
  }
}
