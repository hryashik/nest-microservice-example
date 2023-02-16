import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import * as argon from 'argon2'
import { SignupUserDto } from "./dto/signup-user.dto";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  async signup(dto: SignupUserDto) {
    try {
      const hash = await argon.hash(dto.password)
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash
        }
      }) 
      return user
    } catch (error) {
      if (error.code === 'P2002') {
        throw new RpcException('Credentials is taken')
      }
    }
  }
}