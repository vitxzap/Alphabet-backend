import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { PrismaService } from './database/prisma.service';
import { ManipulateUsers } from './repositories/users/users.repository';
import { PrismaManipulationUsers } from './repositories/users/prisma-users.repository';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [PrismaService,
    {
      provide: ManipulateUsers,
      useClass: PrismaManipulationUsers
    }
  ],
})
export class AppModule {}
