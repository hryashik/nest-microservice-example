import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { GetAllTasksDto } from './dto/get-all-tasks';
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

  @Get()
  getAllTaks(@Body() dto: GetAllTasksDto) {
    return this.taskServiceClient
      .send('get_all_tasks', dto)
      .pipe(
        catchError((error) => throwError(() => new ForbiddenException(error))),
      );
  }
  @Get(':id')
  getTaskById(@Param('id', ParseIntPipe) id: number, @Body() userId: object) {
    return this.taskServiceClient
      .send('get_task_by_id', { id, ...userId })
      .pipe(
        catchError((error) => throwError(() => new ForbiddenException(error))),
      );
  }
}
