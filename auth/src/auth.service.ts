import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { PrismaService } from './prisma/prisma.service';
import * as argon from 'argon2';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  async signup(dto: SignupDto) {
    try {
      const hash = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      delete user.hash
      return user
    } catch (error) {
      if (error.code === 'P2002') {
        throw new RpcException('Credentials is taken')
      }
    }
  }
}
