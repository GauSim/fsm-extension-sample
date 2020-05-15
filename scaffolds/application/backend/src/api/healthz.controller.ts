import { Controller, Get } from '@nestjs/common';
import { configService } from '../config/config.service';

@Controller('healthz')
export class HealthzController {

  @Get()
  healthz() {
    return 'I am fine! -> ' + configService.getVersion();
  }

}
