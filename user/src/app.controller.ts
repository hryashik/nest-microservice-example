import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern('create_user')
  handleUserCreate(@Payload() data: {email: string, password: string}) {
    return data
  }
}
