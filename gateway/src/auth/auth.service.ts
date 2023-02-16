import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.authClient.subscribeToResponseOf('create_user');
    await this.authClient.connect();
  }

  createUser(createUserDto: CreateUserDto) {
    return this.authClient
      .send('create_user', createUserDto)
      .pipe(
        catchError((error) => throwError(() => new ForbiddenException(error))),
      );
  }
}
