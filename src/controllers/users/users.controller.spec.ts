import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { User } from 'src/dtos/user/users.interface';
import { UsersService } from 'src/services/users/users.service';
import { CreateUserDto, FindUserDto } from 'src/dtos/user/users.dto';
import { randomInt } from 'node:crypto';
const mockUser: User = {
  id: 'daa63f9f-7821-4675-97d7-5df1c855a048',
  email: 'jonhdoe@gmail.com',
  authProvider: 'daa63f9f-7821-4675-97d7-5df1c855a047',
  name: 'Jonh',
  lastName: 'Doe',
  password: '12345abcde',
  profilePicture: '/test.png',
};

describe('Users Controller', () => {
  let controller: UsersController;
  let service: UsersService;
  const mockUsersService = {
    findById: jest.fn((value) => {
      return value;
    }),
    create: jest.fn((usr: CreateUserDto) => {
      return usr;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();
    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);

    jest.clearAllMocks();
  });
  describe('Unity tests:', () => {
    it('Controller should be defined', () => {
      expect(controller).toBeDefined();
    });
    it('Controller should call service to create an user', () => {
      const createUser: CreateUserDto = {
        name: 'name',
        lastName: 'last',
        email: 'test@gmail.com',
        password: '12345abcde',
        authProvider: crypto.randomUUID(),
      };
      controller.create(createUser);
      expect(mockUsersService.create).toHaveBeenCalledTimes(1);
      expect(mockUsersService.create).toHaveBeenCalledWith(createUser);
    });
    it('Controller should call service to find an user', () => {
      const data: FindUserDto = {
        id: randomInt(999),
      };
      controller.findById(data);
      expect(mockUsersService.findById).toHaveBeenCalledTimes(1);
      expect(mockUsersService.findById).toHaveBeenCalledWith(data.id);
    });
  });
});
