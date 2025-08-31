import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { PrismaService } from './database/prisma.service';
import { ManipulateUser } from './repositories/user/user.repository';
import { PrismaManipulationUser } from './repositories/user/prisma-user.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [PrismaService,
    {
      provide: ManipulateUser,
      useClass: PrismaManipulationUser
    }
  ],
})
export class AppModule {}
