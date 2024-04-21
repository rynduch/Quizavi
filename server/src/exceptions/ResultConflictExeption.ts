import { ConflictException } from '@nestjs/common';

export class ResultConflictExeption extends ConflictException {
  constructor() {
    super(`Result conflict.`);
  }
}
