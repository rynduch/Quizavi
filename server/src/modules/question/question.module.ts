import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { QuestionService } from './question.service';

@Module({
  providers: [QuestionService],
  imports: [PrismaModule],
  exports: [QuestionService],
})
export class QuestionModule {}
