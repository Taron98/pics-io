/** @format */
import _ from 'lodash';
import config from 'config';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { SessionResponse, StatusError } from '../';

declare module 'express-serve-static-core' {
  interface Request {
    userInfo?: any;
    permissions?: Array<string>;
  }
}

const { secret: jwtSecret } = config.get('jwt');

export function identifyTokenAndDecode(
  request: express.Request,
  securityName: string,
): Promise<any> {
  const token =
    // request.body.token ||
    //   request.query.token ||
    request.headers['x-access-token'] as string;

  if (!token) {
    throw new Error('No token provided.');
  }

  const tokenPrefix = token.substr(0, token.indexOf(' '));

  if (securityName === 'jwt' || (securityName === 'api_jwt' && !tokenPrefix)) {
    return decodeJWT(token);
  } else if (
    (securityName === 'api' || (securityName === 'api_jwt' && tokenPrefix === 'APIKey')) &&
    token === `APIKey a6a66ca5-078e-4ad4-80c7-2dd2da536880` // TODO read from config
  ) {
    request.headers['api-access'] = 'true';
    return Promise.resolve({ API_ACCESS: true });
  }

  return Promise.reject(new Error('No valid token provided'));
}

function decodeJWT(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const secretKey = jwtSecret || '[secret]';
    jwt.verify(token, secretKey, async (err: any, jwtDecoded: any) => {
      if (!err) {
        resolve(jwtDecoded);
      } else {
        reject(
          err.name === 'TokenExpiredError'
            ? new StatusError(403, 'JWT_TOKEN_EXPIRED', 'jwt expired')
            : err,
        );
      }
    });
  });
}

export function authentication(
  request: express.Request,
  jwtDecoded?: any,
  session?: SessionResponse | null,
  permissions?: string[],
): Promise<any> {
  if (!session || session.status !== 'ACTIVE') {
    throw new StatusError(403, 'USER_LOGGED_OUT', 'You have been logged out.');
  }
  const secretKey = jwtSecret || '[secret]';

  const issued = Math.floor(Date.now() / 1000);
  const fifteenMinutesInMs = 15 * 60;
  jwtDecoded.exp = issued + fifteenMinutesInMs;
  request.userInfo = jwtDecoded;
  request.res?.setHeader('Access-Control-Expose-Headers', 'x-access-token');
  request.res?.setHeader('x-access-token', jwt.sign(jwtDecoded, secretKey));
  request.headers['account-id'] = session.user?.toString();

  request.query.user = session.user?.toString();

  return jwtDecoded;
}
