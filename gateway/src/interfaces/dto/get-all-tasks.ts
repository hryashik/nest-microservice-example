import { IsNotEmpty, IsNumber } from "class-validator";

export class GetAllTasksDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number
}