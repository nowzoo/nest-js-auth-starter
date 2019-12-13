import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { User } from '../users/users.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(AuthGuard('local-sign-up'))
  @Post('sign-up')
  async signUp(@Req() req: Request) {
    return this.authService.login(req.user as User);
  }

  @UseGuards(AuthGuard('local-sign-in'))
  @Post('sign-in')
  async login(@Req() req: Request) {
    return this.authService.login(req.user as User);
  }
}
