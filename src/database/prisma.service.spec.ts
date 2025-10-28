import { uuidv4 } from 'better-auth';
import { PrismaService } from './prisma.service';
import { Test, TestingModule } from '@nestjs/testing';

const fakeUser = {
  email: 'fake@test.com',
  name: 'Jonh Doe',
  id: '0AbwLRX3axwOteGcdRf1Jijb9HC6B3Xj',
  image: 'images.com/test.png',
};
describe('PrismaService', () => {
  let service: PrismaService;

  beforeAll(async () => {
    service = new PrismaService();
    await service.onModuleInit();
  });

  afterAll(async () => {
    await service.onModuleDestroy();
  });

  it('Should communicates with database then returns 2', async () => {
    const result: any = await service.$queryRaw`SELECT 1+1 AS result;`;
    expect(result[0].result).toBe(2);
  });

  it('Should create a fake user', async () => {
    const result = await service.user.create({
      data: {
        email: fakeUser.email,
        name: fakeUser.name,
        id: fakeUser.id,
        image: fakeUser.image,
      },
    });
    expect(result).not.toBeNull();
  });
  it('Should delete the fake user', async () => {
    await service.user.delete({
      where: {
        id: fakeUser.id,
      },
    });
    const result: any = await service.user.findUnique({
      where: {
        id: fakeUser.id,
      },
    });
    expect(result).toBeNull();
  });
});
