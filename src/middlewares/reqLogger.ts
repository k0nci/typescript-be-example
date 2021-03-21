import { Middleware } from "koa";
import log4js from "log4js";
import { getLogger, LogLevels } from "../utils/logger";

export function middleware(): Middleware {
  return async (ctx, next) => {
    await next();
  };
  return log4js.connectLogger(getLogger(), {
    level: LogLevels.INFO,
    statusRules: [
      { from: 500, to: 599, level: LogLevels.ERROR },
    ],
  });
}
