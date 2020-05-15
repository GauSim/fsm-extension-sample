import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { RootController } from './api/root.controller';
import { ApiController } from './api/api.controller';
import { DirectoryService } from './service/directory.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { HeadersMiddleware } from './middleware/header.middleware';
import { HealthzController } from './api/healthz.controller';

@Module({
  imports: [],
  controllers: [
    RootController,
    ApiController,
    HealthzController
  ],
  providers: [DirectoryService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        LoggerMiddleware,
        HeadersMiddleware
      )
      .forRoutes({ path: 'api', method: RequestMethod.ALL });
  }
}
