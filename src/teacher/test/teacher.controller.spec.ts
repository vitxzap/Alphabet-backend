import { TeacherService } from '../teacher.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TeacherController } from '../teacher.controller';

describe('TeacherController', () => {
  let teacherService: Partial<TeacherService>;
  let teacherController: TeacherController;
  beforeEach(async () => {
    teacherService = {
      findSemesterByid: jest.fn((id: string) => {
        return new Promise((resolve, reject) => {
          resolve(id as any);
        });
      }),
    };
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [TeacherController],
      providers: [
        {
          provide: TeacherService,
          useValue: teacherService,
        },
      ],
    }).compile();
    teacherService = moduleRef.get<TeacherService>(TeacherService);
    teacherController = moduleRef.get<TeacherController>(TeacherController);
  });

  it('Should be defined', () => {
    expect(teacherController).toBeDefined();
  });

  it('Should return mockValues from mocked service', async () => {
    const date = new Date();
    const value = 'value';
    const data = await teacherController.getSemester({
      user: {
        id: value,
        email: '',
        name: '',
        role: '',
        emailVerified: true,
        createdAt: date,
        updatedAt: date,
        image: '',
      },
      session: {
        createdAt: date,
        expiresAt: date,
        id: '',
        token: '',
        updatedAt: date,
        userId: '',
      },
    });
    expect(data).toBe(value);
  });
});
