import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { QuizNotFoundException } from '../../exceptions/QuizNotFoundException';
import { QuizFilterDto } from './dto/quiz-filter.dto';
import { TokenGuard } from '../authorization/token.guard';
import { UserID } from '../authorization/decorator/user.decorator';

@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}
  @Get()
  @UseGuards(TokenGuard)
  listQuizzes(@Query() filter: QuizFilterDto) {
    return this.quizService.listQuizzes(filter);
  }
  @Get('my')
  @UseGuards(TokenGuard)
  listMyQuizzes(@Query() filter: QuizFilterDto, @UserID() userId: number) {
    return this.quizService.listMyQuizzes(filter, userId);
  }
  @Get(':id')
  @UseGuards(TokenGuard)
  async getQuiz(@Param('id', ParseIntPipe) id: number) {
    const quiz = await this.quizService.getQuiz(id);
    if (!quiz) throw new QuizNotFoundException();
    return quiz;
  }
  @Post()
  @UseGuards(TokenGuard)
  addQuiz(@Body() data: CreateQuizDto, @UserID() userId: number) {
    return this.quizService.addQuiz(data, userId);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(TokenGuard)
  async deleteQuiz(
    @Param('id', ParseIntPipe) id: number,
    @UserID() userId: number,
  ) {
    const quiz = await this.quizService.getQuiz(id);
    if (!quiz) throw new QuizNotFoundException();
    await this.quizService.deleteQuiz(id, userId);
  }
}
