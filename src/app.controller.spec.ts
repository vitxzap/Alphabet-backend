import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './database/prisma.service';
import { UsersController } from './controllers/users/users.controller';
import { ManipulateUsers } from './repositories/users/users.repository';
import { PrismaManipulationUsers } from './repositories/users/prisma-users.repository';
import { Body } from '@nestjs/common';
import { CreateUserDto } from './dtos/user/user-dto';

describe('UserController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        PrismaService,
        {
          provide: ManipulateUsers,
          useClass: PrismaManipulationUsers,
        },
      ],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(
        usersController.get({
          email: 'email@email.com',
          provider: "q1w2e3r4t5y6",
          name: "Jonh",
          lastName: "Doe",
          password: 'SuperS&curePassw0rd',
        }),
      ).toBe('Hello World!');
    });
  });
});
