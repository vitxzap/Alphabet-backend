import { UsersPrismaRepository } from './repository/users.prisma.repository'; 
import { UsersContracts } from './repository/users.contract'; 
import { Module } from '@nestjs/common';
import { UsersController } from 'src/users/controller/users.controller';
import { PrismaService } from 'src/database/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [UsersController],
  providers: [
    PrismaService,
    UsersService,
    {
      provide: UsersContracts,
      useClass: UsersPrismaRepository,
    },
  ],
})
export class UsersModule {}
