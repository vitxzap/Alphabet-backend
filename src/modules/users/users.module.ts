import { UsersPrismaRepository } from 'src/repositories/users/users.prisma.repository';
import { UsersContracts } from 'src/repositories/users/users.contract';
import { Module } from '@nestjs/common';
import { UsersController } from 'src/controllers/users/users.controller';
import { PrismaService } from 'src/database/prisma.service';
import { UsersService } from 'src/services/users/users.service';

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
