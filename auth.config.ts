/** @format */
import * as express from 'express';
import { identifyTokenAndDecode, authentication } from './src/common';
import * as SessionService from './src/session/session.service';

export async function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[],
): Promise<void> {
  const jwtDecoded = await identifyTokenAndDecode(request, securityName);
  if (!jwtDecoded.API_ACCESS) {
    const sessionServiceNew = new SessionService.SessionService();
    const session = await sessionServiceNew.getByUserId(jwtDecoded.id);
    await authentication(request, jwtDecoded, session, scopes);
  }
}
