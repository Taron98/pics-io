/** @format */
export type SessionStatus = 'ACTIVE' | 'INACTIVE';

export type PartialSession = Omit<AuthSession, 'issued' | 'exp'>;

export interface EncodeResult {
  token: string;
  expires: number;
  issued: number;
}

export type DecodeResult =
  | {
      type: 'valid';
      session: AuthSession;
    }
  | {
      type: 'integrity-error';
    }
  | {
      type: 'invalid-token';
    };

export type ExpirationStatus = 'expired' | 'active' | 'grace';
export interface AuthSession {
  id: string;
  dateCreated: number;
  username: string;
  issued: number;
  exp: number;
}

export type SessionResponse = {
  uuid: string;
  user: string;
  username: string;
  status: SessionStatus;
};
