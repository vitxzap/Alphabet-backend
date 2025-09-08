import { AuthPrismaRepository } from './repository/auth.prisma.repository'; 
import { AuthContracts } from './repository/auth.contract'; 
import { Module } from '@nestjs/common';
import { AuthController } from 'src/auth/controller/auth.controller';
import { PrismaService } from 'src/database/prisma.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [AuthController],
  providers: [
    PrismaService,
    AuthService,
    {
      provide: AuthContracts,
      useClass: AuthPrismaRepository,
    },
  ],
})
export class AuthModule {}
