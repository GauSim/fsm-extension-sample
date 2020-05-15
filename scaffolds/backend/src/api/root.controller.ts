import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller()
export class RootController {
  constructor() { }

  @Get()
  root(@Req() req: Request, @Res() res: Response) {
    res.redirect('/app');
  }
}

