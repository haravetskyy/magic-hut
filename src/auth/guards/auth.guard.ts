import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const autorization = request.headers.autorization;
    const token = autorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      await this.jwtService.verifyAsync(token);
      request.user = {
        id: tokenPayload.sub,
        userName: tokenPayload.userName,
      };
      return true;
    } catch (error) {
      throw new UnauthorizedException(error);
    }

    return true;
  }
}
