/** @format */
import LogSchema, { ILog } from './log.model';

export class LogManager {
  private logModel;
  constructor() {
    this.logModel = LogSchema;
  }
  create(data) {
    return this.logModel.create(data);
  }
  getOne(filter): ILog {
    return this.logModel.findOne(filter);
  }
  updateOne(filter, data): ILog {
    return this.logModel.updateOne(filter, data);
  }
}
