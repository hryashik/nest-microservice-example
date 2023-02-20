import { Injectable } from '@nestjs/common';
import { IDto } from './app.controller';
@Injectable()
export class MathService {
  accumulate(dto: IDto): Promise<number> {
    return new Promise((resolve) => {
      resolve(dto.data.reduce((a, b) => Number(a) + Number(b)));
    });
  }
}
