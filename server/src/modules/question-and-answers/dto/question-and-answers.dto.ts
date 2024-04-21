import { CreateQuestionDto } from '../../question/dto/create-question.dto';
import { CreateAnswerDto } from '../../answer/dto/create-answer.dto';

export class QuestionAndAnswersDto {
  questionData: CreateQuestionDto;
  answerData: CreateAnswerDto[];
}
