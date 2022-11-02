import bcrypt from 'bcrypt';
import crypto from 'crypto';

export class CryptographyService {
  public encrypt(plainString: string) {
    return bcrypt.hash(plainString, 10);
  }

  public compare(plainString: string, hash: string) {
    return bcrypt.compare(plainString, hash);
  }

  public generateRandomHash(length: number) {
    return crypto.randomBytes(length).toString('hex');
  }
}
