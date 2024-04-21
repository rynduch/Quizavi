import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { BasicGuard } from './basic.guard';
import { UserID } from './decorator/user.decorator';
import { TokenService } from '../token/token.service';
import { Response } from 'express';

@Controller('authorization')
export class AuthorizationController {
  constructor(private readonly tokenService: TokenService) {}
  @Post('login')
  @UseGuards(BasicGuard)
  @HttpCode(HttpStatus.OK)
  login(@UserID() userId: number, @Res({ passthrough: true }) res: Response) {
    const token = this.tokenService.createToken(userId);
    res.cookie('access-token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 1000), //1h
    });
    res.cookie('is-logged', true, {
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });
    return token;
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access-token');
    res.clearCookie('is-logged');
  }
}
