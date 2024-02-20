/** @format */

import mongoose, { Schema } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  username: string;
  password: string;
}
const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: false },
  },
  {
    timestamps: true,
  },
);
export default mongoose.model<IUser>('User', UserSchema);
