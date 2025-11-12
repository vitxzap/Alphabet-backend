import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { TeacherContract } from './teacher.contract';

@Injectable()
export class TeacherRepository implements TeacherContract {
  constructor(private prismaService: PrismaService) {}
  async findTeacherById(teacherId: string): Promise<object> {
    const data = await this.prismaService.user.findMany({
      where: {
        id: teacherId,
        role: 'teacher',
      },
    });
    return data;
  }
}
