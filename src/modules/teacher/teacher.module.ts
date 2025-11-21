import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherContract } from './teacher.contract';
import { TeacherRepository } from './teacher.repository';
import { TeacherService } from './teacher.service';
@Module({
  controllers: [TeacherController],
  providers: [
    TeacherService,
    {
      provide: TeacherContract,
      useClass: TeacherRepository,
    },
  ],
})
export class TeacherModule {}
