import * as dotenv from 'dotenv'

export class ConfigService {
    private readonly envConfig: { [key: string]: any } = null;
    constructor() {
        dotenv.config()
        this.envConfig = {}
        this.envConfig.gatewayPort = process.env.GATEWAY_PORT
        this.envConfig.userService = {
            port: process.env.USER_SERVICE_PORT,
            host: process.env.USER_SERVICE_HOST
        }
    }
    public get(key: string): any {
        return this.envConfig[key]
    }
}