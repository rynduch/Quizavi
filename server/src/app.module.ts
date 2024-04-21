import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './modules/quiz/quiz.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { QuestionService } from './modules/question/question.service';
import { QuestionModule } from './modules/question/question.module';
import { AnswerModule } from './modules/answer/answer.module';
import { QuestionAndAnswersModule } from './modules/question-and-answers/question-and-answers.module';
import { QuestionAndAnswersController } from './modules/question-and-answers/question-and-answers.controller';
import { AnswerService } from './modules/answer/answer.service';
import { QuestionAndAnswersService } from './modules/question-and-answers/question-and-answers.service';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './modules/token/token.module';
import { UserModule } from './modules/user/user.module';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { QuizService } from './modules/quiz/quiz.service';
import { UserService } from './modules/user/user.service';
import { UserController } from './modules/user/user.controller';
import { ResultModule } from './modules/result/result.module';
import { ResultService } from './modules/result/result.service';
import { ResultController } from './modules/result/result.controller';

@Module({
  imports: [
    QuizModule,
    PrismaModule,
    QuestionModule,
    AnswerModule,
    QuestionAndAnswersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TokenModule,
    UserModule,
    AuthorizationModule,
    ResultModule,
  ],
  controllers: [
    AppController,
    QuestionAndAnswersController,
    UserController,
    ResultController,
  ],
  providers: [
    AppService,
    QuestionService,
    AnswerService,
    QuestionAndAnswersService,
    QuizService,
    UserService,
    ResultService,
  ],
})
export class AppModule {}
