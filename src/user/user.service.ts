/** @format */
import { UserManager } from './user.manager';
import {
  AuthSession,
  EncodeResult,
  PartialSession,
  SignInRequestType,
  SignInResponseType,
  SignUpRequestType,
  StatusError,
} from '../common';
import { SignUpResponseType } from '../common/model/user/user';
import * as bcrypt from 'bcryptjs';
import { SessionService } from '../session/session.service';
import * as jwt from 'jsonwebtoken';
import config from 'config';

export class UserService {
  private userManager: UserManager;
  private sessionService: SessionService;
  constructor() {
    this.userManager = new UserManager();
    this.sessionService = new SessionService();
  }
  async signUp(data: SignUpRequestType): Promise<SignUpResponseType> {
    const { username, password } = data;
    const user = await this.userManager.getOne({ username });
    if (user) {
      throw new StatusError(409, 'ALREADY_EXISTS', 'User already exists');
    }
    const passwordHash = await bcrypt.hash(password, 12);
    const { _id } = await this.userManager.create({ username, password: passwordHash });
    return this.userManager.getOne({ _id });
  }

  async signIn(data: SignInRequestType): Promise<SignInResponseType> {
    const { username, password } = data;
    const user = await this.userManager.getOne({ username }, false);
    if (!user) {
      throw new StatusError(404, 'USER_NOT_FOUND', 'User not found');
    }

    const match = await this.comparePassword(password, user.password);

    if (!match) {
      throw new StatusError(401, 'INVALID_PASSWORD', 'Invalid password');
    }
    const partialSession: PartialSession = {
      id: user._id,
      dateCreated: new Date().getTime(),
      username: user.username,
    };
    const { secret: jwtSecret } = config.get('jwt');

    const encodedSession: EncodeResult = this.encodeSession(
      jwtSecret || '[secret]',
      partialSession,
    );

    await this.sessionService.createSession({
      user: user._id,
      username: user.username,
    });
    return {
      token: encodedSession.token,
      user: await this.userManager.getOne({ _id: user._id }),
    };
  }
  async comparePassword(password: string, dbPassword: string): Promise<boolean> {
    return bcrypt.compare(password, dbPassword);
  }

  encodeSession(secretKey: string, partialSession: PartialSession): EncodeResult {
    const issued = Math.floor(Date.now() / 1000);
    const fifteenMinutesInMs = 15 * 60 * 100000000000; /// Adding time only for testing
    const exp = issued + fifteenMinutesInMs;

    const session: AuthSession = {
      ...partialSession,
      issued: issued,
      exp: exp,
    };

    return {
      token: jwt.sign(session, secretKey),
      issued: issued,
      expires: exp,
    };
  }
}
