import { Module } from "@nestjs/common";
import { PrismaModule } from './prisma/prisma.module';
import { taskController } from "./task.controller";
import { TaskService } from "./task.service";

@Module({
  imports: [PrismaModule],
  controllers: [taskController],
  providers: [TaskService]
})
export class TaskModule {}