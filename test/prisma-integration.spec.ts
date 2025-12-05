import { PrismaService } from 'src/database/prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
describe('Prisma', () => {
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
        }),
      ],
    }).compile();
    prismaService = module.get<PrismaService>(PrismaService);
    const c = await prismaService.$connect();
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  describe('Connection', () => {
    it('Should be defined', () => {
      expect(prismaService).toBeDefined();
    });

    // This is not appropriate, gonna change it soon
    it('Should call database', async () => {
      const result = await prismaService.user.count();
      expect(result).toBeDefined();
    });
  });
});
