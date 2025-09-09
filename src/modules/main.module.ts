import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';

@Module({ //Imports every module and compile them
  imports: [AuthModule],
})
export class MainModule {}
