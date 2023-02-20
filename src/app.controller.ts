import { Body, Controller, Get, Post } from '@nestjs/common';
import { MathService } from './math.service';

export interface IDto {
  data: number[]
}

@Controller()
export class AppController {
  constructor(private readonly mathService: MathService) {}

  @Post()
  async getHello(@Body() dto: IDto) {
    return this.mathService.accumulate(dto)
  }
}
