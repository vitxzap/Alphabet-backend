import { Test, TestingModule } from '@nestjs/testing';
import { TeacherContractRepository } from '../teacher.contract';
import { TeacherController } from '../teacher.controller';
import { TeacherService } from '../teacher.service';

describe('TeacherService', () => {
  let teacherService: TeacherService;
  let contract: TeacherContractRepository;
  const mockValues = { id: '1', semester: '1' };
  beforeEach(async () => {
    const mockContract = {
      findSemesterById: jest.fn().mockResolvedValue(mockValues),
    };
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [TeacherController],
      providers: [
        {
          provide: TeacherContractRepository,
          useValue: mockContract,
        },
        TeacherService,
      ],
    }).compile();
    contract = moduleRef.get<TeacherContractRepository>(
      TeacherContractRepository,
    );
    teacherService = moduleRef.get<TeacherService>(TeacherService);
  });

  it('Should be defined', () => {
    expect(teacherService).toBeDefined();
  });

  it('Should call contract function', async () => {
    await teacherService.findSemesterByid('1');
    expect(contract.findSemesterById).toHaveBeenCalled();
  });
  it('Should return mockValues from mocked contract', async () => {
    const data = await teacherService.findSemesterByid('1');
    expect(data).toBe(mockValues);
  });
});
