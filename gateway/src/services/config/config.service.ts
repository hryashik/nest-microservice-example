import { Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config()

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;
  constructor() {
    this.envConfig = {};
    this.envConfig.port = process.env.GATEWAY_PORT;
    this.envConfig.authService = {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
      },
    };
  }
  get(key: string) {
    return this.envConfig[key];
  }
}
