import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';

export type APIHeaders = Partial<{
  'x-account': string;
  'x-account-id': string;
  'x-company': string;
  'x-company-id': string;
  'x-user': string;
  'x-user-id': string;
  'x-cloud-host': string;
}>

@Injectable()
export class HeadersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    const missingHeaders = [
      'x-account',
      'x-account-id',
      'x-company',
      'x-company-id',
      'x-user',
      'x-user-id',
      'x-cloud-host',
    ].filter(key => !req.headers[key.toLowerCase()]);

    next(
      missingHeaders.length
        ? new UnauthorizedException(`missing headers ${missingHeaders}`)
        : undefined
    );
  }
}
