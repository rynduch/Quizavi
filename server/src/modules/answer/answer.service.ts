import { PrismaService } from '../prisma/prisma.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { AnswerConflictException } from '../../exceptions/AnswerConflictException';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AnswerService {
  constructor(private readonly prisma: PrismaService) {}
  async listAnswer() {
    return this.prisma.answer.findMany({});
  }
  async addAnswer(data: CreateAnswerDto, userId: number) {
    try {
      return this.prisma.answer.create({
        data: {
          questionId: data.questionId,
          index: data.index,
          answerContent: data.answerContent,
          correct: data.correct,
          userId: userId,
        },
      });
    } catch (e) {
      if (e.code === 'P2002') {
        throw new AnswerConflictException();
      }
      throw e;
    }
  }
  async getAnswers(q: number) {
    return this.prisma.answer.findMany({
      where: {
        questionId: q,
      },
    });
  }
  async deleteAnswer(id: number) {
    return this.prisma.answer.delete({
      where: {
        id,
      },
    });
  }
}
