import { Injectable } from '@nestjs/common';
import { TeacherContract } from './teacher.contract';

@Injectable()
export class TeacherService {
  constructor(private contract: TeacherContract) {}

  async findTeacherByid(teacherId: string) {
    const data = await this.contract.findTeacherById(teacherId);
    return data;
  }
}
