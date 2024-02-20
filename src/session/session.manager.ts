/** @format */
import { v4 as uuidv4 } from 'uuid';
import Session, { ISession } from './session.models';
import { RawCreateSessionRequest } from './session.models';

export class SessionManager {
  async create(userData: RawCreateSessionRequest): Promise<ISession> {
    const session: ISession | null = await Session.create({
      uuid: uuidv4(),
      ...userData,
    });
    if (!session) {
      throw new Error('Failed to create session');
    }
    return session;
  }

  async getByUUID(uuid: string): Promise<ISession | null> {
    const session: ISession | null = await Session.findOne({ uuid });
    return session;
  }

  async getByUserId(userId: string): Promise<ISession | null> {
    const session: ISession | null = await Session.findOne({ user: userId });
    return session;
  }

  async deleteMany(userId: string): Promise<void> {
    await Session.deleteMany({ user: userId });
  }

  async updateStatusByUserId(userId: string, status: string): Promise<void> {
    await Session.updateOne({ user: userId }, { status: status });
  }

  async updateStatusByUserIds(userIds: Array<string>, status: string): Promise<void> {
    await Session.updateMany({ userId: { $in: userIds } }, { status: status });
  }
}
