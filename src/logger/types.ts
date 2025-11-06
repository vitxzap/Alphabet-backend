import { LoggerService } from "@nestjs/common";

export type ContextualLogger = Pick<
  LoggerService,
  'log' | 'warn' | 'error' | 'debug' | 'fatal'
>;
