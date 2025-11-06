import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class MyLoggerService extends ConsoleLogger implements LoggerService {
  constructor() {
    super({ timestamp: true, showHidden: true });
  }
  forContext(context: string): LoggerService {
    const base = this;
    return {
      log: (m: any) => base.log(m, context),
      error: (m: any, t?: string) => base.error(m, t, context),
      warn: (m: any) => base.warn(m, context),
      debug: (m: any) => base.debug?.(m, context),
      verbose: (m: any) => base.verbose?.(m, context),
      fatal: (m: any) => base.fatal(m, context),
    };
  }
}
