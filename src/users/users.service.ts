import { Injectable } from '@nestjs/common';
import { User } from './users.types';

const users: User[] = [
  {
    id: 1,
    userName: 'Yuriy',
    password: 'passwordExample123',
  },
  {
    id: 2,
    userName: 'Mykola',
    password: 'PasswordExample1234',
  },
];

@Injectable()
export class UsersService {
  async finUserByName(useruserName: string): Promise<User | undefined> {
    return users.find((user) => user.userName === useruserName);
  }
}
