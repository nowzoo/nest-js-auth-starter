import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        id: 1,
        name: 'Chris',
        email: 'chris@nowzoo.com',
        password: 'changeme',
      },
    ];
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async create(name: string, email: string, password: string): Promise<User> {
    const id = this.users.length + 1;
    const user: User = { id, name, email, password };
    this.users.push(user);
    return user;
  }

}
