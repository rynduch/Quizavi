import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateQuestionDto } from '../../question/dto/create-question.dto';
import { CreateAnswerDto } from '../../answer/dto/create-answer.dto';

export class CreateQuestionAndAnswersDto {
  @ValidateNested()
  @Type(() => CreateQuestionDto)
  questionData: CreateQuestionDto;

  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  answerData: CreateAnswerDto[];
}
