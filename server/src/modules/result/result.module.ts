import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { QuizService } from '../quiz/quiz.service';
import { PrismaService } from '../prisma/prisma.service';
import { QuestionAndAnswersService } from '../question-and-answers/question-and-answers.service';
import { QuestionService } from '../question/question.service';
import { AnswerService } from '../answer/answer.service';

@Module({
  providers: [
    ResultService,
    QuizService,
    PrismaService,
    QuestionAndAnswersService,
    QuestionService,
    AnswerService,
  ],
  controllers: [ResultController],
  exports: [ResultService],
})
export class ResultModule {}
