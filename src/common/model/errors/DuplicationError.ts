/** @format */

import { StatusCodes } from 'http-status-codes';
import { StatusError } from './StatusError';

export class DuplicationError extends StatusError {
  duplicateFields?: Array<string>;
  duplicateObjects?: Array<any>;
  constructor(
    name: string,
    msg: string,
    duplicateFields?: Array<string>,
    duplicateObjects?: Array<any>,
  ) {
    super(StatusCodes.CONFLICT, name, msg);
    this.duplicateFields = duplicateFields;
    this.duplicateObjects = duplicateObjects;
  }
}
