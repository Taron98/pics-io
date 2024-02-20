/** @format */
import UserSchema, { IUser } from './user.model';

export class UserManager {
  private userModel;
  constructor() {
    this.userModel = UserSchema;
  }
  async getOne(filter, secure = true): Promise<IUser> {
    let exclude = {};
    if (secure) exclude = { password: 0 };

    return this.userModel.findOne(filter, exclude);
  }
  async create(data): Promise<IUser> {
    return this.userModel.create(data);
  }
}
