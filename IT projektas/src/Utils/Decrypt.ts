import jwt from 'jsonwebtoken';

import { JwtTokenPayload } from '#Modules/Cryptography/types';

const { PASSWORD_SECRET } = process.env;
export const decryptToken = (token: string) => {
  let payload: JwtTokenPayload | null = null;

  try {
    payload = jwt.verify(token, PASSWORD_SECRET) as JwtTokenPayload;
  } catch (error) {
    throw new Error('JWT token is invalid');
  }

  if (!payload?.id) {
    throw new Error('Bad format of the JWT. Token did not have user id in it');
  }

  return payload.id;
};
