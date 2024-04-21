import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from '../question/question.service';
import { AnswerService } from '../answer/answer.service';
import { QuestionNotFoundException } from '../../exceptions/QuestionNotFoundException';
import { CreateQuestionAndAnswersDto } from './dto/create-question-and-answers.dto';
import { QuestionAndAnswersDto } from './dto/question-and-answers.dto';
import { AnswerDto } from '../answer/dto/answer.dto';
import { AnswerNotFoundException } from '../../exceptions/AnswerNotFoundException';
import { QuizService } from '../quiz/quiz.service';
import { TokenGuard } from '../authorization/token.guard';
import { UserID } from '../authorization/decorator/user.decorator';
import { QuizNotFoundException } from '../../exceptions/QuizNotFoundException';
import { AnswerBadRequestException } from '../../exceptions/AnswerBadRequestException';

@Controller('quiz/:id/question')
export class QuestionAndAnswersController {
  constructor(
    private questionService: QuestionService,
    private answerService: AnswerService,
    private quizService: QuizService,
  ) {}
  @Post()
  @UseGuards(TokenGuard)
  async addQuestionAndAnswers(
    @Param('id', ParseIntPipe) id: number,
    @Body() createQuestionAnswerDto: CreateQuestionAndAnswersDto,
    @UserID() userId: number,
  ) {
    const quiz = await this.quizService.getQuiz(id);
    if (!quiz) throw new QuizNotFoundException();
    if (
      createQuestionAnswerDto.answerData.length >
      createQuestionAnswerDto.questionData.numberOfAnswers
    ) {
      throw new AnswerBadRequestException();
    }
    createQuestionAnswerDto.questionData.quizId = id;
    const question = await this.questionService.addQuestion(
      createQuestionAnswerDto.questionData,
      userId,
    );
    const answers = await Promise.all(
      createQuestionAnswerDto.answerData.map((data) => {
        data.questionId = question.id;
        return this.answerService.addAnswer(data, userId);
      }),
    );
    return answers;
  }
  @Get(':index')
  @UseGuards(TokenGuard)
  async getQuestionAndAnswers(
    @Param('id', ParseIntPipe) id: number,
    @Param('index', ParseIntPipe) index: number,
  ) {
    const question = await this.questionService.getQuestion(id, index);
    if (!question) throw new QuestionNotFoundException();
    const answers: Promise<AnswerDto[]> = this.answerService.getAnswers(
      question.id,
    );
    if (!answers) throw new AnswerNotFoundException();
    const questionAndAnswers: QuestionAndAnswersDto = {
      questionData: question,
      answerData: await answers,
    };
    return questionAndAnswers;
  }
}
