import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { TeacherContractRepository } from './teacher.contract';

@Injectable()
export class TeacherRepository implements TeacherContractRepository {
  constructor(private prisma: PrismaService) {}
  async findCourse(): Promise<object> {
    const payload = await this.prisma.course.findMany();
    return payload;
  }
}
