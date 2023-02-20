import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from './services/config/config.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [],
})
export class AppModule {}
