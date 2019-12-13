import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalSignUpStrategy extends PassportStrategy(Strategy, 'local-sign-up') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, email: string, password: string): Promise<any> {
    const user = await this.authService.signUp(req.body.name, email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
