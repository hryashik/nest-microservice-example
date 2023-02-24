import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('signup')
  signup(@Payload() dto: SignupDto) {
    return this.authService.signup(dto);
  }
  @MessagePattern('login')
  login(@Payload() dto: SignupDto) {
    return this.authService.login(dto);
  }
  @MessagePattern('get_user_by_id')
  getUserById(@Payload() userId: number) {
    return this.authService.getUserById(userId)
  }
  @MessagePattern('verify_token')
  verifyToken(@Payload() token: string) {
    return this.authService.decodeToken(token);
  }
  
}
