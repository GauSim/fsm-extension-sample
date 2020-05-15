
import { Controller, Get, Headers, Param, UnprocessableEntityException, InternalServerErrorException } from '@nestjs/common';
import fsm = require('fsm-sdk');
import { configService } from '../config/config.service';
import { DirectoryService } from '../service/directory.service';
import { APIHeaders } from '../middleware/header.middleware';

@Controller('api')
export class ApiController {
  constructor(private directory: DirectoryService) { }

  private getClient(headers: APIHeaders) {

    const oauthEndpoint = this.directory.resolveOauthEndpoint(headers['x-cloud-host']);
    const client = new fsm.CoreAPIClient({

      clientIdentifier: configService.getClientIdentifier(),
      clientSecret: configService.getClientSecret(),
      clientVersion: configService.getVersion(),

      ... (oauthEndpoint ? { oauthEndpoint } : {/** use default oauth */ }),

      authGrantType: 'client_credentials',
      authAccountName: headers['x-account'],
      authCompany: headers['x-company'],

      authUserName: undefined,
      authPassword: undefined,

      debug: configService.isLocal(),
    });

    return client;
  }

  @Get('activity/:activityId')
  async activity(@Headers() headers: APIHeaders, @Param('activityId') activityId: string) {

    if (!activityId) {
      throw new UnprocessableEntityException('missing activityId');
    }

    const client = this.getClient(headers);

    try {

      const [{ activity }] = await client.getById('Activity', activityId).then(it => it.data);
      return activity;

    } catch (error) {
      console.error(error);
      throw configService.isLocal() ? error : new InternalServerErrorException('internal error');
    }
  }
}
