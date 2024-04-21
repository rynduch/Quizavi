import { QuestionService } from '../../../src/modules/question/question.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../src/modules/prisma/prisma.service';
import { CreateQuestionDto } from '../../../src/modules/question/dto/create-question.dto';

describe('QuestionService', () => {
  let questionService: QuestionService;
  let prismaService: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionService, PrismaService],
    }).compile();
    prismaService = module.get<PrismaService>(PrismaService);
    questionService = module.get<QuestionService>(QuestionService);
  });

  describe('addQuestion', () => {
    it('should add question', async () => {
      const createQuestionDto: CreateQuestionDto = {
        quizId: 1,
        index: 1,
        questionContent: 'question test',
        numberOfAnswers: 5,
      };
      jest
        .spyOn(prismaService.question, 'create')
        .mockResolvedValueOnce({} as any);
      const result = await questionService.addQuestion(createQuestionDto, 3);

      expect(result).toBeDefined();
      expect(prismaService.question.create).toHaveBeenCalledWith({
        data: {
          quizId: 1,
          index: 1,
          questionContent: 'question test',
          numberOfAnswers: 5,
          userId: 3,
        },
      });
    });
  });

  describe('deleteQuestion', () => {
    it('should delete question', async () => {
      const questionId = 1;
      jest
        .spyOn(prismaService.question, 'delete')
        .mockResolvedValueOnce({} as any);
      const result = await questionService.deleteQuestion(questionId);

      expect(prismaService.question.delete).toHaveBeenCalledWith({
        where: {
          id: questionId,
        },
      });
      expect(result).toBeDefined();
    });
  });
});
