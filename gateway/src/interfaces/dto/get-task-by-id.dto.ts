import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetTaskByIdDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  id: number;
}
