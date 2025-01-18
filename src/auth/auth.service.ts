import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthInput, AuthResult, SignInData } from './auth.types';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Sign } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.usersService.finUserByName(input.userName);

    if (user && user.password === input.password) {
      return {
        id: user.id,
        userName: user.userName,
      };
    }

    return null;
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    const tokenPayLoad = {
      sub: user.id,
      userName: user.userName,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayLoad);

    return { accessToken, userName: user.userName, id: user.id };
  }

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException('User was not found!');
    }

    return this.signIn(user)
  }
}
