export abstract class TeacherContractRepository {
    abstract findCourse(): Promise<object>
}