import { ErrorRequestHandler } from 'express';
import { NodeEnv } from '../../types';
import { HttpError } from '../errors/HttpError';
import { InternalServerError } from '../errors/InternalServerError';
import { getLogger } from '../logger';

const LOGGER = getLogger();

type ResBody = {
  'error': string;
  'stack'?: string;
};

function normalizeMessage(err: HttpError): string {
  return err.message.toLowerCase().replace(/\s/g, '_');
}

function devError(err: HttpError): ResBody {
  return {
    error: normalizeMessage(err),
    stack: err.stack,
  };
}

function prodError(err: HttpError): ResBody {
  return {
    error: normalizeMessage(err),
  };
}

export function middleware(env: NodeEnv): ErrorRequestHandler {
  return (err, req, res, next) => {
    let httpErr: HttpError;
    // Check if instance of HttpError
    if (!err.status) {
      httpErr = new InternalServerError();
    } else {
      httpErr = err;
    }

    let body: ResBody;
    if (env === NodeEnv.DEVELOPMENT) {
      body = devError(httpErr);
    } else {
      body = prodError(httpErr);
    }

    if (httpErr.status >= 500) {
      LOGGER.error(err);
    }
    return res.status(httpErr.status).json(body).end();
  };
}
