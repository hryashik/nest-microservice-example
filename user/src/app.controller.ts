import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { SignupUserDto } from './dto/signup-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @MessagePattern('create_user')
  handleUserCreate(@Payload() data: SignupUserDto) {
    return this.appService.signup(data)
  }
}
  