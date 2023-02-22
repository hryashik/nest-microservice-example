import { NestFactory } from '@nestjs/core';
import { ConfigService } from './config/config';
import { TaskModule } from './task.module';

async function bootstrap() {
  const options = new ConfigService().get('taskService');
  const app = await NestFactory.createMicroservice(TaskModule, options);
  await app.listen();
}
bootstrap();
