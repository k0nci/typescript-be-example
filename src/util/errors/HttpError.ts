export class HttpError extends Error {
  readonly status: number;

  constructor(message: string = 'Internal server error', status: number = 500) {
    super(message);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.status = status;
  }
}
