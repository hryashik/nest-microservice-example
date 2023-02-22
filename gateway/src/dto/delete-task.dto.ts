import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteTaskDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number

  @IsNotEmpty()
  @IsNumber()
  id: number
}