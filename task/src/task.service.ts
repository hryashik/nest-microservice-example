import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
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

  async updateTask(dto: UpdateTaskDto) {
    try {
      const tasks: Task[] = await this.prisma.task.findMany({
        where: {
          userId: dto.userId,
        },
      });
      if (tasks.find((el) => el.id === dto.id)) {
        const task: Task = await this.prisma.task.update({
          where: {
            id: dto.id,
          },
          data: {
            ...dto,
          },
        });
        return task;
      } else {
        throw new Error('User have no this task (id)');
      }
    } catch (error) {
      throw new RpcException('Incorrect task id');
    }
  }

  async deleteTask(dto: DeleteTaskDto) {
    try {
      const tasks = await this.prisma.task.findMany({
        where: {
          userId: dto.userId,
        },
      });
      if (!!tasks.find((el) => el.id === 25)) {
        return await this.prisma.task.delete({
          where: {
            id: dto.id,
          },
        });
      }
    } catch (error) {
      if (error.code === 'P2025') {
        throw new RpcException(`Task id ${dto.id} does not exist`)
      }
      throw new RpcException('Incorrect task id');
    }
  }
}
