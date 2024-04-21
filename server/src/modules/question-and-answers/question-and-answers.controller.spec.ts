import { Test, TestingModule } from '@nestjs/testing';
import { QuestionAndAnswersController } from './question-and-answers.controller';

describe('QuestionAndAnswersController', () => {
  let controller: QuestionAndAnswersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionAndAnswersController],
    }).compile();

    controller = module.get<QuestionAndAnswersController>(QuestionAndAnswersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
