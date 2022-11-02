import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const UserContext = createParamDecorator((_: never, context: ExecutionContext) => {
  const { req } = GqlExecutionContext.create(context).getContext();
  return req.user;
});
