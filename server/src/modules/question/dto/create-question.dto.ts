import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateQuestionDto {
  @Type(() => Number)
  quizId: number;
  @IsNumber()
  @IsNotEmpty()
  index: number;
  @IsString()
  @IsNotEmpty()
  questionContent: string;
  @IsNumber()
  @IsNotEmpty()
  numberOfAnswers: number;
}
