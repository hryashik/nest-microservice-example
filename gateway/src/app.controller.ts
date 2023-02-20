import { Body, Controller, Post } from '@nestjs/common';
import { MathService } from './math/math.service';

export interface IDto {
  data: number[];
}

@Controller()
export class AppController {
  constructor(private readonly mathService: MathService) {}

  @Post()
  accumulate(@Body() dto: IDto) {
    return this.mathService.accumulate(dto);
  }
}
