import { BadRequestException } from "@nestjs/common";

export class AnswerBadRequestException extends BadRequestException {
  constructor() {
    super("Invalid answer index.");
  }
}
