export abstract class TeacherContract {
  abstract findTeacherById(teacherId: string): Promise<object>;
}
