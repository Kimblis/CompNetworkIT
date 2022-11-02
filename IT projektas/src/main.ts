import { NestFactory } from '@nestjs/core';
import { EventEmitter } from 'events';

import { LoggingService } from '#Logger';

import { AppModule } from './AppModule';

const { API_PORT } = process.env;

async function bootstrap() {
  EventEmitter.defaultMaxListeners = 30;
  const app = await NestFactory.create(AppModule, {
    logger: new LoggingService(),
  });
  app.enableCors();

  await app.startAllMicroservices();
  await app.listen(API_PORT, () => {
    console.info('Server is listening on port: ' + API_PORT);
  });
}
bootstrap();
