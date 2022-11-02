import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

import { DataLoaderInterceptor } from '#Utils';

export const Loader = createParamDecorator(async (data: any, context: ExecutionContext & { [key: string]: any }) => {
  const ctx: any = GqlExecutionContext.create(context).getContext();

  if (context.getType<GqlContextType>() !== 'graphql') {
    throw new InternalServerErrorException('@Loader should only be used within the GraphQL context');
  }

  if (ctx.DATALOADER_CONTEXT_KEY === undefined) {
    throw new InternalServerErrorException(`
            You should provide interceptor ${DataLoaderInterceptor.name} globally with ${APP_INTERCEPTOR}
          `);
  }

  return ctx.DATALOADER_CONTEXT_KEY.getLoader(data);
});
