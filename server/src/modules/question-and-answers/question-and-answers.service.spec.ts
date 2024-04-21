import { Test, TestingModule } from '@nestjs/testing';
import { QuestionAndAnswersService } from './question-and-answers.service';

describe('QuestionAndAnswersService', () => {
  let service: QuestionAndAnswersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionAndAnswersService],
    }).compile();

    service = module.get<QuestionAndAnswersService>(QuestionAndAnswersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
