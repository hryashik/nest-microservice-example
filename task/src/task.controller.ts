import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { GetAllTasksDto } from './dto/get-all-tasks.dto';
import { GetTaskByIdDto } from './dto/get-task-by-id.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';

@Controller()
export class taskController {
  constructor(private readonly taskService: TaskService) {}

  @MessagePattern('create_task')
  createTask(@Payload() dto: CreateTaskDto) {
    return this.taskService.createTask(dto);
  }
  @MessagePattern('update_task')
  updateTask(@Payload() dto: UpdateTaskDto) {
    return this.taskService.updateTask(dto);
  }
  @MessagePattern('delete_task')
  deleteTask(@Payload() dto: DeleteTaskDto) {
    return this.taskService.deleteTask(dto);
  }
  @MessagePattern('get_all_tasks')
  getAllTasks(@Payload() dto: GetAllTasksDto) {
    return this.taskService.getAllTasks(dto)
  }
  @MessagePattern('get_task_by_id')
  getTaskById(@Payload() dto: GetTaskByIdDto) {
    return this.taskService.getTaskById(dto)
  }
}
