import { HttpError } from './HttpError';

export class ValidationError extends HttpError {
  constructor(message: string = 'Validation error', status: number = 400) {
    super(message, status);
  }
}
