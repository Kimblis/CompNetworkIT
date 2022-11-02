import { CallHandler, ExecutionContext, Injectable, InternalServerErrorException, NestInterceptor } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { Observable } from 'rxjs';

interface NestDataLoader<ID, Type> {
  generateDataLoader(): DataLoader<ID, Type>;
}

@Injectable()
export class DataLoaderInterceptor implements NestInterceptor {
  constructor(private readonly moduleRef: ModuleRef) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType<GqlContextType>() !== 'graphql') {
      return next.handle();
    }

    const ctx = GqlExecutionContext.create(context).getContext();

    if (!ctx) {
      return next.handle();
    }

    if (ctx.DATALOADER_CONTEXT_KEY === undefined) {
      ctx.DATALOADER_CONTEXT_KEY = {
        contextId: ContextIdFactory.create(),
        getLoader: (type: any): Promise<NestDataLoader<any, any>> => {
          if (ctx[type] === undefined) {
            try {
              ctx[type] = (async () => {
                const nestDataLoader = await this.moduleRef.resolve<NestDataLoader<any, any>>(
                  type,
                  ctx.DATALOADER_CONTEXT_KEY.contextId,
                  {
                    strict: false,
                  },
                );
                return nestDataLoader.generateDataLoader();
              })();
            } catch (e) {
              throw new InternalServerErrorException(`The loader ${type} is not provided ${e}`);
            }
          }
          return ctx[type];
        },
      };
    }
    return next.handle();
  }
}
