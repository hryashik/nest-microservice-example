import { Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config()

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;
  constructor() {
    this.envConfig = {};
    this.envConfig.taskService = {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: process.env.TASK_SERVICE_PORT,
      },
    };
  }
  get(key: string) {
    return this.envConfig[key];
  }
}
