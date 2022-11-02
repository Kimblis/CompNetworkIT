import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpRequestData } from './types';

@Injectable()
export class AllExceptionInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        const type = context.getType().toString();
        error.data = type === 'graphql' ? context.getArgByIndex(1) : this.retrieveHttpRequestData(context);
        throw error;
      }),
    );
  }

  private retrieveHttpRequestData(context: ExecutionContext) {
    const data: HttpRequestData = {} as HttpRequestData;
    const { query, body, params } = context.switchToHttp().getRequest();

    if (Object.keys(query).length) {
      data.query = query;
    }
    if (Object.keys(body).length) {
      data.body = body;
    }
    if (Object.keys(params).length) {
      data.params = params;
    }

    return Object.keys(data).length ? data : null;
  }
}
