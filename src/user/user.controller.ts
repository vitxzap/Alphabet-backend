import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  findAll(): string {
    return 'Found by controller';
  }

  @Get('/service')
  findByService(): string {
    return this.userService.getUsers();
  }
}
