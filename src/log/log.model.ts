/** @format */

import mongoose, { Schema } from 'mongoose';
export interface ILog extends Document {
  _id: string;
  request: {};
  response: {};
}

const LogSchema: Schema = new Schema(
  {
    request: mongoose.Schema.Types.Mixed,
    response: mongoose.Schema.Types.Mixed,
  },
  {
    timestamps: true,
  },
);
export default mongoose.model<ILog>('Log', LogSchema);
