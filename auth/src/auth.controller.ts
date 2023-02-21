import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @MessagePattern('signup')
  signup(@Payload() data: SignupDto) {
    return this.authService.signup(data);
  }
  @MessagePattern('login')
  login(@Payload() data: SignupDto) {}
}
