import { Test, TestingModule } from '@nestjs/testing';
import { QuizService } from '../../../src/modules/quiz/quiz.service';
import { PrismaService } from '../../../src/modules/prisma/prisma.service';
import { CreateQuizDto } from '../../../src/modules/quiz/dto/create-quiz.dto';
import { QuestionAndAnswersService } from '../../../src/modules/question-and-answers/question-and-answers.service';
import { QuestionService } from '../../../src/modules/question/question.service';
import { AnswerService } from '../../../src/modules/answer/answer.service';
import { ResultService } from '../../../src/modules/result/result.service';

describe('QuizService', () => {
  let quizService: QuizService;
  let prismaService: PrismaService;
  let questionAndAnswersService: QuestionAndAnswersService;
  let resultService: ResultService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizService,
        QuestionAndAnswersService,
        QuestionService,
        AnswerService,
        ResultService,
        PrismaService,
      ],
    }).compile();
    quizService = module.get<QuizService>(QuizService);
    prismaService = module.get<PrismaService>(PrismaService);
    questionAndAnswersService = module.get<QuestionAndAnswersService>(
      QuestionAndAnswersService,
    );
    resultService = module.get<ResultService>(ResultService);
  });

  describe('addQuiz', () => {
    it('should add quiz', async () => {
      const createQuizDto: CreateQuizDto = {
        title: 'quiz test',
        description: 'description test',
        imageSrc: null,
        numberOfQuestions: 5,
      };
      jest.spyOn(prismaService.quiz, 'create').mockResolvedValueOnce({} as any);
      const result = await quizService.addQuiz(createQuizDto, 3);

      expect(result).toBeDefined();
      expect(prismaService.quiz.create).toHaveBeenCalledWith({
        data: {
          title: 'quiz test',
          description: 'description test',
          imageSrc: null,
          numberOfQuestions: 5,
          userId: 3,
        },
      });
    });
  });

  describe('deleteQuiz', () => {
    it('should delete quiz', async () => {
      const quizId = 1;
      const userId = 3;
      jest
        .spyOn(questionAndAnswersService, 'deleteQuiz')
        .mockResolvedValueOnce({} as any);
      jest.spyOn(resultService, 'deleteQuiz').mockResolvedValueOnce({} as any);
      jest.spyOn(prismaService.quiz, 'delete').mockResolvedValueOnce({} as any);
      const result = await quizService.deleteQuiz(quizId, userId);

      expect(questionAndAnswersService.deleteQuiz).toHaveBeenCalledWith(quizId);
      expect(resultService.deleteQuiz).toHaveBeenCalledWith(quizId);
      expect(prismaService.quiz.delete).toHaveBeenCalledWith({
        where: {
          id: quizId,
          userId: userId,
        },
      });
      expect(result).toBeDefined();
    });
  });
});
