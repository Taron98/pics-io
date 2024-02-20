/** @format */
import _ from 'lodash';
import config from 'config';
import mongoose from 'mongoose';
import { DuplicationError } from '../model/errors';

const mongoConfig: {
  username: string;
  password: string;
  host: string;
  port: number;
  db: string;
  authSource: string;
} = config.get('mongo');

export const openConnectionToDb = async () => {
  await mongoose.connect(
    `mongodb://root:qazxsw@ec2-54-191-140-193.us-west-2.compute.amazonaws.com:27017/?authMechanism=DEFAULT&authSource=test`,
  );

  // if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', true);
  // }
};
