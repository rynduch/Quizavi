import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { PrismaService } from '../prisma/prisma.service';
import { QuestionAndAnswersService } from '../question-and-answers/question-and-answers.service';
import { QuizFilterDto } from './dto/quiz-filter.dto';
import { ResultService } from '../result/result.service';

@Injectable()
export class QuizService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly questionAndAnswersService: QuestionAndAnswersService,
    private readonly resultService: ResultService,
  ) {}

  async listQuizzes(filter: QuizFilterDto) {
    return this.prisma.quiz.findMany({
      orderBy: {
        [filter.sortBy]: filter.sortOrder,
      },
    });
  }
  async listMyQuizzes(filter: QuizFilterDto, userId: number) {
    return this.prisma.quiz.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        [filter.sortBy]: filter.sortOrder,
      },
    });
  }
  async addQuiz(data: CreateQuizDto, userId: number) {
    return this.prisma.quiz.create({
      data: {
        title: data.title,
        description: data.description,
        imageSrc: data.imageSrc,
        numberOfQuestions: data.numberOfQuestions,
        userId: userId,
      },
    });
  }
  getQuiz(id: number) {
    return this.prisma.quiz.findUnique({
      where: {
        id: id,
      },
    });
  }
  async deleteQuiz(id: number, userId: number) {
    await this.questionAndAnswersService.deleteQuiz(id);
    await this.resultService.deleteQuiz(id);
    return this.prisma.quiz.delete({
      where: {
        id: id,
        userId: userId,
      },
    });
  }
}
