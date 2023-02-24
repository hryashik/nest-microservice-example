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
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { doesNotMatch } from 'assert';
import { catchError, throwError } from 'rxjs';
import { IAuthorizedRequest } from './interfaces/common/authorized-request.interface';
import { CreateTaskDto } from './interfaces/dto/create-task.dto';
import { DeleteTaskDto } from './interfaces/dto/delete-task.dto';
import { GetAllTasksDto } from './interfaces/dto/get-all-tasks';
import { UpdateTaskDto } from './interfaces/dto/update-task.dto';
import { Authorization } from './services/decorators/auth.decorator';

@Controller('task')
export class TaskController {
  constructor(
    @Inject('TASK_SERVICE') private readonly taskServiceClient: ClientProxy,
  ) {}

  @Authorization(true)
  @Post()
  createTask(@Body() dto: CreateTaskDto, @Req() req: IAuthorizedRequest) {
    const userId = req.user.id;
    const payload = {
      ...dto,
      userId,
    };
    return this.taskServiceClient
      .send('create_task', payload)
      .pipe(
        catchError((error) => throwError(() => new ForbiddenException(error))),
      );
  }

  @Authorization(true)
  @Patch(':id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: IAuthorizedRequest,
    @Body() dto: UpdateTaskDto,
  ) {
    const payload = {
      id,
      userId: req.user.id,
      ...dto
    }
    return this.taskServiceClient
      .send('update_task', payload)
      .pipe(
        catchError((error) => throwError(() => new ForbiddenException(error))),
      );
  }

  @Authorization(true)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: IAuthorizedRequest,
  ) {
    const dto = { id, userId: req.user.id };
    return this.taskServiceClient
      .send('delete_task', dto)
      .pipe(
        catchError((error) => throwError(() => new ForbiddenException(error))),
      );
  }

  @Authorization(true)
  @Get()
  getAllTaks(@Req() req: IAuthorizedRequest) {
    return this.taskServiceClient
      .send('get_all_tasks', req.user.id)
      .pipe(
        catchError((error) => throwError(() => new ForbiddenException(error))),
      );
  }
  @Authorization(true)
  @Get(':id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: IAuthorizedRequest,
  ) {
    const payload = {
      id,
      userId: req.user.id,
    };
    return this.taskServiceClient
      .send('get_task_by_id', payload)
      .pipe(
        catchError((error) => throwError(() => new ForbiddenException(error))),
      );
  }
}
