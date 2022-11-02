import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentRequest = createParamDecorator((_: any, ctx: ExecutionContext) => {
  const { req } = GqlExecutionContext.create(ctx).getContext();

  return req;
});
