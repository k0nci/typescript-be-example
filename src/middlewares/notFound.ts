import { Middleware } from 'koa';
import { HttpError } from '../utils/errors/HttpError';

export function middleware(): Middleware {
  return (ctx, next) => {
    throw new HttpError('Not found', 404);
  };
}
