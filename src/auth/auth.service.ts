import { Injectable } from '@nestjs/common';
import { UsersService, User } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === password) {
      delete user.password;
      return user;
    }
    return null;
  }

  async signUp(name: string, email: string, password: string): Promise<User> {
    const existing = await this.usersService.findOne(email);
    if (existing) {
      return null;
    }
    const user: User = await this.usersService.create(name, email, password);
    delete user.password;
    return user;
  }

  async login(user: User) {
    const payload = { name: user.name, email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
