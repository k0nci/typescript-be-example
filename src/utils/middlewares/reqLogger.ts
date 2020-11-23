import { RequestHandler } from 'express';
import log4js from 'log4js';
import { getLogger, LogLevels } from '../logger';

export function middleware(): RequestHandler {
  return log4js.connectLogger(getLogger(), { level: LogLevels.INFO });
}
