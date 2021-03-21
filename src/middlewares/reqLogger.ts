import { Middleware } from 'koa';
import log4js from 'koa-log4';
import { getLogger } from '../utils/logger';

export function middleware(): Middleware {
  return log4js.koaLogger(getLogger('HTTP'), { level: 'auto' });
}
