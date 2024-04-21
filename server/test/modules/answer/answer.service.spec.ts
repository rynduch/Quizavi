import { Test, TestingModule } from '@nestjs/testing';
import { AnswerService } from '../../../src/modules/answer/answer.service';
import { PrismaService } from '../../../src/modules/prisma/prisma.service';
import { CreateAnswerDto } from '../../../src/modules/answer/dto/create-answer.dto';

describe('AnswerService', () => {
  let answerService: AnswerService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerService, PrismaService],
    }).compile();
    answerService = module.get<AnswerService>(AnswerService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('addAnswer', () => {
    it('should add answer', async () => {
      const createAnswerDto: CreateAnswerDto = {
        questionId: 1,
        index: 1,
        answerContent: 'answer test',
        correct: true,
      };
      jest
        .spyOn(prismaService.answer, 'create')
        .mockResolvedValueOnce({} as any);
      const result = await answerService.addAnswer(createAnswerDto, 3);

      expect(result).toBeDefined();
      expect(prismaService.answer.create).toHaveBeenCalledWith({
        data: {
          questionId: 1,
          index: 1,
          answerContent: 'answer test',
          correct: true,
          userId: 3,
        },
      });
    });
  });

  describe('deleteAnswer', () => {
    it('should delete answer', async () => {
      const answerId = 1;
      jest
        .spyOn(prismaService.answer, 'delete')
        .mockResolvedValueOnce({} as any);
      const result = await answerService.deleteAnswer(answerId);

      expect(prismaService.answer.delete).toHaveBeenCalledWith({
        where: {
          id: answerId,
        },
      });
      expect(result).toBeDefined();
    });
  });
});
