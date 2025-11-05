import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { TeacherContractRepository } from './teacher.contract';

@Injectable()
export class TeacherRepository implements TeacherContractRepository {
  constructor(private prismaService: PrismaService) {}
  async findSemesterById(teacherId: string): Promise<object> {
    const data = await this.prismaService.semester.findMany({
      where: {
        teacherid: teacherId,
      },
    });
    return data;
  }
}
