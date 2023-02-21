import {
  Body,
  Controller,
  ForbiddenException,
  Inject,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
  ) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authServiceClient
      .send('signup', dto)
      .pipe(
        catchError((error) => throwError(() => new ForbiddenException(error))),
      );
  }
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authServiceClient
      .send('login', dto)
      .pipe(
        catchError((error) => throwError(() => new ForbiddenException(error))),
      );
  }
}
