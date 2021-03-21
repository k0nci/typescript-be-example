import { Middleware } from 'koa';
import { NodeEnv } from '../types/node';
import { HttpError } from '../utils/errors/HttpError';
import { InternalServerError } from '../utils/errors/InternalServerError';
import { getLogger } from '../utils/logger';

const LOGGER = getLogger();

type IResBody = {
  error: string;
  details?: any;
  stack?: string;
};

function normalizeMessage(err: HttpError): string {
  return err.message.toLowerCase().replace(/\s/g, '_');
}

function buildBodyDev(err: HttpError): IResBody {
  const stack = err instanceof InternalServerError ? err.stack : undefined;
  return {
    error: normalizeMessage(err),
    details: err.details,
    // tslint:disable-next-line: object-shorthand-properties-first
    stack,
  };
}

function buildBodyProd(err: HttpError): IResBody {
  return {
    error: normalizeMessage(err),
  };
}

export function middleware(env: NodeEnv): Middleware {
  let buildResBody: (error: HttpError) => IResBody;
  if (env === NodeEnv.DEVELOPMENT) {
    buildResBody = buildBodyDev;
  } else {
    buildResBody = buildBodyProd;
  }

  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      // Check if instance of HttpError
      const httpErr: HttpError = err.status ? err : new InternalServerError();
      const body = buildResBody(httpErr);

      if (httpErr.status >= 500) {
        LOGGER.error(err);
      }
      
      ctx.status = httpErr.status;
      ctx.body = body;
    }
  };
}
