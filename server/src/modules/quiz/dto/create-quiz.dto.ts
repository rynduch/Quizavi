import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsString()
  @IsOptional()
  imageSrc?: string;
  @IsNumber()
  @IsNotEmpty()
  numberOfQuestions: number;
}
