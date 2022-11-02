import jwt from 'jsonwebtoken';

import { JwtTokenPayload } from './types';

const { PASSWORD_SECRET, PASSWORD_EXPIRES } = process.env;

export class JwtCryptographyService {
  public encrypt(userId: number) {
    return jwt.sign({ id: userId }, PASSWORD_SECRET, {
      expiresIn: PASSWORD_EXPIRES,
    });
  }

  public decrypt(token: string) {
    let payload: JwtTokenPayload | null = null;

    try {
      payload = jwt.verify(token, PASSWORD_SECRET) as JwtTokenPayload;
    } catch (error) {
      throw new Error('JWT token is invalid');
    }

    if (!payload?.id) {
      throw new Error('Bad format of the JWT. Token did not have user id in it');
    }

    return { userId: payload.id };
  }
}
