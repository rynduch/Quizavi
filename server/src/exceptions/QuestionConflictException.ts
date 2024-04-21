import { ConflictException } from '@nestjs/common';

export class QuestionConflictException extends ConflictException {
  constructor() {
    super(`Question already exists`);
  }
}
