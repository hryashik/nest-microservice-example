import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { GetAllTasksDto } from './dto/get-all-tasks.dto';
import { GetTaskByIdDto } from './dto/get-task-by-id.dto';
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
      if (tasks.find((el) => el.id === dto.id)) {
        return await this.prisma.task.delete({
          where: {
            id: dto.id,
          },
        });
      } else throw new RpcException('Incorrect taskId');
    } catch (error) {
      if (error.code === 'P2025') {
        throw new RpcException(`Task id ${dto.id} does not exist`);
      }
      throw new RpcException('Incorrect task id');
    }
  }

  async getAllTasks(dto: GetAllTasksDto) {
    try {
      return await this.prisma.task.findMany({
        where: {
          userId: dto.userId,
        },
      });
    } catch (error) {
      throw new RpcException('Invalid userId');
    }
  }
  async getTaskById(dto: GetTaskByIdDto) {
    try {
      const tasks = await this.prisma.task.findMany({
        where: {
          userId: dto.userId,
        },
      });
      const findTask = tasks.find((el) => el.id === dto.id);
      if (findTask) {
        return findTask;
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new RpcException('Incorrect taskId');
    }
  }
}
