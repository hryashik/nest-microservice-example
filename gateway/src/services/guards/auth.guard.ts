import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
    private readonly reflector: Reflector,
  ) {}
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    // get a value from context
    const secured = this.reflector.get('secured', context.getHandler());
    if (!secured) return true;

    const request = context.switchToHttp().getRequest();
    // get a token from headers
    const token: string = request.headers.authorization;
    // decode token
    const userTokenInfo = await firstValueFrom(
      this.authServiceClient.send<{ userId: number }>('verify_token', token),
    );
    // throw exception if user or token not found
    if (!token || !userTokenInfo) throw new UnauthorizedException();
    // get a user from auth service
    const userInfo = await firstValueFrom(
      this.authServiceClient.send('get_user_by_id', userTokenInfo.userId),
    );
    request.user = userInfo

    return true;
  }
}
