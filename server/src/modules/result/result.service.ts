import { Injectable } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ResultConflictExeption } from '../../exceptions/ResultConflictExeption';

@Injectable()
export class ResultService {
  constructor(private readonly prisma: PrismaService) {}
  async addResult(data: CreateResultDto, userId: number) {
    try {
      const quiz = await this.prisma.quiz.findUnique({
        where: {
          id: data.quizId,
        },
      });
      const result = await this.prisma.result.create({
        data: {
          quizId: quiz.id,
          userId: userId,
          quizTitle: quiz.title,
          points: data.points,
          quizNumberOfQuestions: quiz.numberOfQuestions,
        },
      });
      return result;
    } catch (e) {
      if (e.code === 'P2002') {
        throw new ResultConflictExeption();
      }
      throw e;
    }
  }
  async listResults(userId: number) {
    return this.prisma.result.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  async deleteQuiz(quizId: number) {
    await this.prisma.result.deleteMany({
      where: {
        quizId: quizId,
      },
    });
  }
}
