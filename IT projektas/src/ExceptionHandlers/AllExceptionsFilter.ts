import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { ApolloError } from 'apollo-server';

import { GraphQLErrorMessages } from '#GraphQL';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private type: string;

  private action: string;

  private args: any;

  private exception: any;

  private isHandledError: boolean;

  private host: ArgumentsHost;

  async catch(exception: any, host: ArgumentsHost) {
    this.exception = exception;
    this.host = host;
    this.type = host.getType();
    this.isHandledError = exception instanceof ApolloError;

    this.setErrorDataByType();
    this.logError();
    if (!this.isHandledError) {
      exception.message = GraphQLErrorMessages.GENERIC;
    }

    return this.type === 'http' ? this.httpResponse() : this.exception;
  }

  setErrorDataByType() {
    switch (this.type) {
      case 'graphql':
        this.setGraphqlError();
        break;
      case 'http':
        this.setHttpError();
        break;
      default:
        return;
    }
  }

  setGraphqlError() {
    const args = this.host.getArgs();
    [, this.args] = args;
    this.action = args[3].fieldName;
  }

  setHttpError() {
    const req = this.host.switchToHttp().getRequest();
    this.action = req.route?.path || req.url;
    this.args = this.exception.data;
  }

  private httpResponse() {
    const response = this.host.switchToHttp().getResponse();

    return response.status(this.exception.status || 500).json({
      message: this.exception.message,
    });
  }

  private logError() {
    console.warn(`While executing ("${this.action}") the following error occurred:`);
    console.warn('Args:');
    console.warn(this.exception.data || this.args);

    const args = {
      action: this.action,
      message: this.exception.message,
      data: this.exception.data || this.args,
      stack: this.exception.stack,
    };

    return this.isHandledError ? console.info(args) : console.error(args);
  }
}
