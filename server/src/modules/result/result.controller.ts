import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TokenGuard } from '../authorization/token.guard';
import { UserID } from '../authorization/decorator/user.decorator';
import { QuizService } from '../quiz/quiz.service';
import { CreateResultDto } from './dto/create-result.dto';
import { ResultService } from './result.service';
import { QuizNotFoundException } from '../../exceptions/QuizNotFoundException';

@Controller('result')
export class ResultController {
  constructor(
    private resultService: ResultService,
    private quizService: QuizService,
  ) {}
  @Post()
  @UseGuards(TokenGuard)
  async addResult(
    @Body() createResultDto: CreateResultDto,
    @UserID() userId: number,
  ) {
    const quiz = await this.quizService.getQuiz(createResultDto.quizId);
    if (!quiz) throw new QuizNotFoundException();
    return this.resultService.addResult(createResultDto, userId);
  }
  @Get()
  @UseGuards(TokenGuard)
  listResults(@UserID() userId: number) {
    return this.resultService.listResults(userId);
  }
}
