import { Injectable } from '@nestjs/common';
import { TeacherContractRepository } from './teacher.contract';

@Injectable()
export class TeacherService {
  constructor(private repository: TeacherContractRepository) {}
  // Finds all semester by teachers id
  async findSemesterByid(teacherId: string) {
    const data = await this.repository.findSemesterById(teacherId);
    return data;
  }
}
