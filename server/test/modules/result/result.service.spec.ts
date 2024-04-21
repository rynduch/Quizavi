import { Test, TestingModule } from '@nestjs/testing';
import { ResultService } from '../../../src/modules/result/result.service';
import { PrismaService } from '../../../src/modules/prisma/prisma.service';
import { CreateResultDto } from '../../../src/modules/result/dto/create-result.dto';

describe('ResultService', () => {
  let resultService: ResultService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResultService, PrismaService],
    }).compile();
    resultService = module.get<ResultService>(ResultService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('addResult', () => {
    it('should add result', async () => {
      const createResultDto: CreateResultDto = {
        quizId: 1,
        points: 3,
      };

      jest.spyOn(prismaService.quiz, 'findUnique').mockResolvedValueOnce({
        id: 1,
        title: 'quiz test',
        numberOfQuestions: 5,
      } as any);

      jest
        .spyOn(prismaService.result, 'create')
        .mockResolvedValueOnce({} as any);

      const result = await resultService.addResult(createResultDto, 3);

      expect(result).toBeDefined();
      expect(prismaService.quiz.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(prismaService.result.create).toHaveBeenCalledWith({
        data: {
          quizId: 1,
          userId: 3,
          quizTitle: 'quiz test',
          points: 3,
          quizNumberOfQuestions: 5,
        },
      });
    });
  });
});
