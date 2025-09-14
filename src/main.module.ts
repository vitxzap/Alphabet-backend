import { Module } from '@nestjs/common';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './lib/auth';
import { AuthController } from './auth/auth.controller';
import { PrismaService } from './database/prisma.service';

@Module({
  //Imports every module and compile them
  imports: [
    AuthModule.forRoot(auth, {
      disableExceptionFilter: true,
      disableBodyParser: true
    }),
  ],
  controllers: [AuthController],
  providers: [PrismaService],
})
export class MainModule {}
