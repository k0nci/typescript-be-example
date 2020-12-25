import { HttpError } from './HttpError';

export class ValidationError extends HttpError {
  private static STATUS_CODE = 400;

  constructor(message: string = 'Validation error') {
    super(message, ValidationError.STATUS_CODE);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
