import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthController {
  @MessagePattern('signup')
  signup(@Payload() data: any) {
    return data
  }
}
