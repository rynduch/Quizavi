import { BadRequestException } from "@nestjs/common";

export class QuestionBadRequestException extends BadRequestException {
  constructor() {
    super("Invalid question index.");
  }
}
