import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(dto: CreateTaskDto) {
    try {
      const task = await this.prisma.task.create({
        data: {
          ...dto,
        },
      });
      return task;
    } catch (error) {
      if (error.code === 'P2003') {
        throw new RpcException('userId is incorrect');
      }
    }
  }
}
