import { LoggerService } from '@nestjs/common';
import { format, transports } from 'winston';
import { format as UtilFormat } from 'util';
import SentryTransport from 'winston-transport-sentry-node';

import { Logger } from './Logger';

const { NODE_ENV, SENTRY_DSN, SENTRY_ENV } = process.env;

export class LoggingService extends Logger implements LoggerService {
  constructor() {
    super();

    if (NODE_ENV === 'production') {
      this.setProductionFormatter();
    } else {
      this.setDebugFormatter();
    }

    if (SENTRY_ENV && SENTRY_DSN) {
      this.connectLoggerToSentry();
    }
  }

  private setDebugFormatter() {
    this.logger.add(
      new transports.Console({
        level: 'debug',
        format: format.combine(
          format.colorize(),
          format.simple(),
          format.printf((log: any) => {
            const message = log.stack || log.message;
            const params = log[Symbol.for('splat')] || [];
            return `${log.timestamp} ${log.level}: ${UtilFormat(message, params.length ? JSON.stringify(params) : '')}`;
          }),
        ),
      }),
    );
  }

  private setProductionFormatter() {
    this.logger.add(
      new transports.Console({
        level: 'info',
        format: format.printf(({ level, message }) => `${level}: ${UtilFormat(message)}`),
        handleExceptions: true,
      }),
    );
  }

  private connectLoggerToSentry() {
    this.logger.add(
      new SentryTransport({
        sentry: {
          dsn: SENTRY_DSN,
          environment: SENTRY_ENV,
        },
        level: 'error',
        handleExceptions: true,
      }),
    );
  }
}
