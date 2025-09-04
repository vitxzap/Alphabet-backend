import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UsersContracts } from './users.contract'; 
import { User } from 'src/users/interface/users.interface';
import { CreateUserDto } from 'src/users/dto/users.dto';

@Injectable()
export class UsersPrismaRepository implements UsersContracts {
  constructor(private prisma: PrismaService) {}
  async findById(id: any): Promise<User | any> {
    throw new Error('Method not implemented.'); 
  }
  async create(user: CreateUserDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async deleteById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async updateById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
