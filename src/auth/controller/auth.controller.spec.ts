import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from 'src/auth/controller/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { signInDto, logInDto } from 'src/auth/dto/auth.dto';

describe('Auth Controller', () => { //Testing controller logics
  let controller: AuthController; 
  let service: AuthService;
  const mockAuthService = {
    login: jest.fn((value) => {
      return value;
    }),
    signin: jest.fn((usr: signInDto) => {
      return usr;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();
    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });
  describe('Unity tests:', () => {
    it('Controller should be defined', () => {
      expect(controller).toBeDefined();
    });
    it('Controller should call service to create an user', () => {
      const createUser: signInDto = {
        name: 'name',
        lastName: 'last',
        email: 'test@gmail.com',
        password: '12345abcde',
        provider: 1,
        icon: 'image.com',
      };
      controller.signIn(createUser);
      expect(mockAuthService.signin).toHaveBeenCalledTimes(1);
      expect(mockAuthService.signin).toHaveBeenCalledWith(createUser);
    });
    it('Controller should call service to find an user', () => {
      const data: logInDto = {
        email: 'jonhdoe@test.com',
        password: 'password',
      };
      controller.logIn(data);
      expect(mockAuthService.login).toHaveBeenCalledTimes(1);
      expect(mockAuthService.login).toHaveBeenCalledWith(data);
    });
  });
});
