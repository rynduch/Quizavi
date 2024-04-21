import { ConflictException } from "@nestjs/common";

export class AnswerConflictException extends ConflictException {
  constructor() {
    super(`Answer already exists`);
  }
}
