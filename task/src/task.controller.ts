import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';

@Controller()
export class taskController {
  constructor(private readonly taskService: TaskService) {}

  @MessagePattern('create_task')
  createTask(@Payload() dto: CreateTaskDto) {
    return this.taskService.createTask(dto);
  }
}
