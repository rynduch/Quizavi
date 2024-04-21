import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAnswerDto {
  @Type(() => Number)
  questionId: number;
  @IsNumber()
  index: number;
  @IsString()
  @IsNotEmpty()
  answerContent: string;
  @IsBoolean()
  correct: boolean;
}
