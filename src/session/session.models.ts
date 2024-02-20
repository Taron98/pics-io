/** @format */
import mongoose, { Schema, Document } from 'mongoose';

export type RawCreateSessionRequest = {
  user: string;
  username: string;
};
export type SessionStatus = 'ACTIVE' | 'INACTIVE';

export interface ISession extends Document {
  uuid: string;
  user: string;
  username: string;
  status: SessionStatus;
}

const SessionSchema: Schema = new Schema(
  {
    uuid: { type: String, required: true, index: true },
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    status: { type: String, default: 'ACTIVE', required: true, index: true },
  },
  {
    timestamps: true,
  },
);
export default mongoose.model<ISession>('session', SessionSchema);
