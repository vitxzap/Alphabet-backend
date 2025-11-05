export abstract class TeacherContractRepository {
  abstract findSemesterById(teacherId: string): Promise<object>;
}
