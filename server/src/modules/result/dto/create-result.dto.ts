import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateResultDto {
  @IsNumber()
  @IsNotEmpty()
  points: number;
  @IsNumber()
  @IsNotEmpty()
  quizId: number;
}
