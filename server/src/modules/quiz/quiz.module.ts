import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { QuestionAndAnswersService } from '../question-and-answers/question-and-answers.service';
import { QuestionService } from '../question/question.service';
import { AnswerService } from '../answer/answer.service';
import { ResultService } from '../result/result.service';

@Module({
  providers: [
    QuizService,
    QuestionAndAnswersService,
    QuestionService,
    AnswerService,
    ResultService,
  ],
  controllers: [QuizController],
  imports: [PrismaModule],
  exports: [QuizService],
})
export class QuizModule {}
