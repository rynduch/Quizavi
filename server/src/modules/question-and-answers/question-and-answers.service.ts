import { Injectable } from '@nestjs/common';
import { QuestionService } from '../question/question.service';
import { AnswerService } from '../answer/answer.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuestionAndAnswersService {
  constructor(
    private readonly questionService: QuestionService,
    private readonly answerService: AnswerService,
    private readonly prisma: PrismaService,
  ) {}
  async deleteQuiz(id: number) {
    const questions = await this.prisma.question.findMany({
      where: {
        quizId: id,
      },
    });
    for (const question of questions) {
      const answers = await this.prisma.answer.findMany({
        where: {
          questionId: question.id,
        },
      });
      for (const answer of answers) {
        await this.answerService.deleteAnswer(answer.id);
      }
      await this.questionService.deleteQuestion(question.id);
    }
  }
}
