import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Inject,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(
    @Inject('TASK_SERVICE') private readonly taskServiceClient: ClientProxy,
  ) {}

  @Post()
  createTask(@Body() dto: CreateTaskDto) {
    return this.taskServiceClient
      .send('create_task', dto)
      .pipe(
        catchError((error) => throwError(() => new ForbiddenException(error))),
      );
  }

  @Patch()
  updateTask(@Body() dto: UpdateTaskDto) {
    return this.taskServiceClient
      .send('update_task', dto)
      .pipe(
        catchError((error) => throwError(() => new ForbiddenException(error))),
      );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  deleteTask(@Body() dto: DeleteTaskDto) {
    return this.taskServiceClient
      .send('delete_task', dto)
      .pipe(
        catchError((error) => throwError(() => new ForbiddenException(error))),
      );
  }
}
