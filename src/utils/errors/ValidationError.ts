import { HttpError } from './HttpError';

export class ValidationError extends HttpError {
  private static STATUS = 400;

  constructor(message: string = 'Validation error') {
    super(message, ValidationError.STATUS);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
