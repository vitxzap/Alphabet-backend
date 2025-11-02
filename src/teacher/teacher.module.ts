import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherContractRepository } from './teacher.contract';
import { TeacherRepository } from './teacher.repository';
import { TeacherService } from './teacher.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [TeacherController],
  providers: [
    TeacherService,
    {
      provide: TeacherContractRepository,
      useClass: TeacherRepository,
    },
  ],
})
export class TeacherModule {}
