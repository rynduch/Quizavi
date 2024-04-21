import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthorizationController } from './authorization.controller';

@Module({
  providers: [AuthorizationService],
  imports: [PrismaModule],
  controllers: [AuthorizationController],
})
export class AuthorizationModule {}
