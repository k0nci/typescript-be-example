import { ErrorRequestHandler } from 'express';
import { NodeEnv } from '..';
import { HttpError } from '../errors/HttpError';

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
    let body: ResBody;
    if (env === NodeEnv.DEVELOPMENT) {
      body = devError(err);
    } else {
      body = prodError(err);
    }

    return res.status(err.status).json(body).end();
  };
}
