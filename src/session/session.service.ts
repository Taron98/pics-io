/** @format */
import { SessionResponse } from '../common';
import { ISession, RawCreateSessionRequest } from './session.models';
import { SessionManager } from './session.manager';

export class SessionService {
  private sessionManager: SessionManager;
  constructor() {
    this.sessionManager = new SessionManager();
  }

  async createSession(userData: RawCreateSessionRequest): Promise<ISession> {
    await this.deleteByUserId(userData.user);
    return this.sessionManager.create(userData);
  }

  async getByUUID(uuid: string): Promise<ISession | null> {
    return await this.sessionManager.getByUUID(uuid);
  }

  async getByUserId(userId: string): Promise<SessionResponse | null> {
    const session: ISession | null = await this.sessionManager.getByUserId(userId);
    return session ? this.mapISessionToSessionResponse(session) : null;
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.sessionManager.deleteMany(userId);
  }

  async updateStatusByUserId(userId: string, status: string): Promise<void> {
    await this.sessionManager.updateStatusByUserId(userId, status);
  }

  async updateStatusByUserIds(userIds: any, status: string): Promise<void> {
    await this.sessionManager.updateStatusByUserIds(userIds, status);
  }

  mapISessionToSessionResponse(session: ISession): SessionResponse {
    return {
      uuid: session.uuid,
      user: session.user,
      username: session.username,
      status: session.status,
    };
  }
}
