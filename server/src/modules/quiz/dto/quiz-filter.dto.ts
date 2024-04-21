import { IsEnum, IsOptional } from 'class-validator';

export class QuizFilterDto {
  @IsOptional()
  @IsEnum(['createdAt', 'title', 'numberOfQuestions'])
  sortBy?: string = 'title';
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'desc';
}
