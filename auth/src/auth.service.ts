import { ForbiddenException, Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { PrismaService } from './prisma/prisma.service';
import * as argon from 'argon2';
import { RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    try {
      const hash = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      delete user.hash;
      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new RpcException('Credentials is taken');
      }
    }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });
    const validatePw = await argon.verify(user.hash, dto.password);
    if (!user || !validatePw) throw new RpcException('Incorrect credentials');

    const token = await this.createToken(dto.email);
    return {
      access_token: token,
    };
  }

  async createToken(userId: string) {
    return this.jwtService.sign({ userId });
  }
}
