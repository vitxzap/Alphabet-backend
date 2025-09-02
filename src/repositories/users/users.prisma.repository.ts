import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UsersContracts } from './users.contract';
import { User } from 'src/dtos/user/users.interface';
import { CreateUserDto } from 'src/dtos/user/users.dto';

@Injectable()
export class UsersPrismaRepository implements UsersContracts {
  constructor(private prisma: PrismaService) {}
  async findById(id: any): Promise<User | any> {
    const mockUser: User = {
      id: "daa63f9f-7821-4675-97d7-5df1c855a048",
      email: "jonhdoe@gmail.com",
      authProvider: "daa63f9f-7821-4675-97d7-5df1c855a047",
      name: "Jonh",
      lastName: "Doe",
      password: "12345abcde",
      profilePicture: "/test.png"
    }
    return mockUser;
  }
  async create(user: CreateUserDto): Promise<void> {
    
  }
  async deleteById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async updateById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
