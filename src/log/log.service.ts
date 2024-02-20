/** @format */

import { LogRequestType } from '../common';
import { LogManager } from './log.manager';
import { ILog } from './log.model';

/** @format */
export class LogService {
  private logManager: LogManager;
  constructor() {
    this.logManager = new LogManager();
  }
  async log(data: LogRequestType): Promise<ILog> {
    return await this.logManager.create(data);
  }
  async updateOne(filter, data: LogRequestType): Promise<void> {
    const log = await this.logManager.getOne(filter);
    if (!(log && log.response)) await this.logManager.updateOne(filter, data);
  }
}
