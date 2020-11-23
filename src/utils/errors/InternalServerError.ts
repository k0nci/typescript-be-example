import { HttpError } from './HttpError';

export class InternalServerError extends HttpError {
  private static STATUS = 500;

  constructor(message: string | Error = 'Internal server error') {
    if (message instanceof Error) {
      super('Internal server error', InternalServerError.STATUS, message);
    } else {
      super(message, InternalServerError.STATUS);
    }
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
