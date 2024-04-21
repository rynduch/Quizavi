import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionConflictException } from '../../exceptions/QuestionConflictException';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}
  async listQuestion() {
    return this.prisma.question.findMany({});
  }
  async addQuestion(data: CreateQuestionDto, userId: number) {
    try {
      return await this.prisma.question.create({
        data: {
          quizId: data.quizId,
          index: data.index,
          questionContent: data.questionContent,
          numberOfAnswers: data.numberOfAnswers,
          userId: userId,
        },
      });
    } catch (e) {
      if (e.code === 'P2002') {
        throw new QuestionConflictException();
      }
      throw e;
    }
  }
  async getQuestion(id: number, index: number) {
    return this.prisma.question.findFirst({
      where: {
        quizId: id,
        index: index,
      },
    });
  }
  async deleteQuestion(id: number) {
    return this.prisma.question.delete({
      where: {
        id,
      },
    });
  }
}
