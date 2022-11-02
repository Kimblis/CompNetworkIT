import { ConsoleLogger } from '@nestjs/common';
import winston, { Logger as LoggerType, format } from 'winston';

export class Logger extends ConsoleLogger {
  protected logger: LoggerType;

  constructor() {
    super();

    this.logger = winston.createLogger({
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss.SSS',
        }),
        format.json(),
      ),
    });
    this.setLoggerOnConsole();
  }

  private setLoggerOnConsole() {
    console.log = (...args: [any]) => this.logger.info.call(this.logger, ...args);
    console.info = (...args: [any]) => this.logger.info.call(this.logger, ...args);
    console.warn = (...args: [any]) => this.logger.warn.call(this.logger, ...args);
    console.error = (...args: [any]) => this.logger.error.call(this.logger, ...args);
    console.debug = (...args: [any]) => this.logger.debug.call(this.logger, ...args);
  }
}
