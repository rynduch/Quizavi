import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [AnswerService],
  imports: [PrismaModule],
  exports: [AnswerService],
})
export class AnswerModule {}
