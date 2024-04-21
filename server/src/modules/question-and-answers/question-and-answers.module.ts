import { Module } from '@nestjs/common';
import { QuestionAndAnswersController } from './question-and-answers.controller';
import { QuestionAndAnswersService } from './question-and-answers.service';
import { QuestionService } from '../question/question.service';
import { AnswerService } from '../answer/answer.service';
import { PrismaModule } from '../prisma/prisma.module';
import { QuizService } from '../quiz/quiz.service';
import { ResultService } from '../result/result.service';

@Module({
  controllers: [QuestionAndAnswersController],
  providers: [
    QuestionAndAnswersService,
    QuestionService,
    AnswerService,
    QuizService,
    ResultService,
  ],
  imports: [PrismaModule],
  exports: [QuestionAndAnswersService],
})
export class QuestionAndAnswersModule {}
