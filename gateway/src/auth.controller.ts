import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Headers,
  Inject,
  Post,
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { catchError, throwError } from 'rxjs';
import { IAuthorizedRequest } from './interfaces/common/authorized-request.interface';
import { LoginDto } from './interfaces/dto/login.dto';
import { SignupDto } from './interfaces/dto/signup.dto';
import { Authorization } from './services/decorators/auth.decorator';
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
