import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestApplicationOptions } from '@nestjs/common';
import * as compression from 'compression';
import express = require('express');
import path = require('path');


import { configService } from './config/config.service';

async function bootstrap() {

  const config: NestApplicationOptions = {
    cors: configService.isLocal(),
    logger: !configService.isLocal() ? console : undefined,
  };

  const app = await NestFactory.create(AppModule, config);
  app.use(compression());
  app.use('/app', express.static(path.join(__dirname, '/static/frontend')));


  if (configService.isLocal()) {
    console.log(`starting server on http://localhost:${configService.getPort()}`);
  }

  await app.listen(configService.getPort());
}
bootstrap();
