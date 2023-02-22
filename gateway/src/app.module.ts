import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { ConfigService } from './services/config/config.service';
import { AuthGuard } from './services/guards/auth.guard';
import { TaskController } from './task.controller';

@Module({
  controllers: [AuthController, TaskController],
  providers: [
    ConfigService,
    {
      provide: 'AUTH_SERVICE',
      useFactory: (configService: ConfigService) => {
        const authServiceOptions = new ConfigService().get('authService');
        return ClientProxyFactory.create(authServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: 'TASK_SERVICE',
      useFactory: (configService: ConfigService) => {
        const taskServiceOptions = new ConfigService().get('taskService');
        return ClientProxyFactory.create(taskServiceOptions);
      },
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
