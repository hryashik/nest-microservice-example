import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const authOptions = new ConfigService().get('authService')
  const app = await NestFactory.createMicroservice(AuthModule, authOptions);
  await app.listen();
}
bootstrap();
