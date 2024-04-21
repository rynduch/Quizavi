import { NotFoundException } from '@nestjs/common';

export class QuizNotFoundException extends NotFoundException {
  constructor() {
    super('Quiz not found.');
  }
}
