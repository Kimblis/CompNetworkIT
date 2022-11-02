import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import * as Modules from '#Modules';
import * as Scalars from '#GraphQL/Scalars';
import { graphQLOptions } from '#GraphQL';
import typeOrmConnectionOptions from '#TypeORM';
import { DataLoaderInterceptor } from '#Utils';
import { AllExceptionInterceptor, AllExceptionsFilter } from '#ExceptionHandlers';
import { validate } from '#Environment';

@Module({
  imports: [
    ConfigModule.forRoot({ validate }),
    TypeOrmModule.forRoot(typeOrmConnectionOptions),
    GraphQLModule.forRoot(graphQLOptions),
    ...Object.values(Scalars),
    ...Object.values(Modules),
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: DataLoaderInterceptor },
    { provide: APP_INTERCEPTOR, useClass: AllExceptionInterceptor },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule {}
