import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { AdminContract } from './admin.contract';
@Injectable()
export class AdminRepository implements AdminContract {
  constructor(private prismaService: PrismaService) {}

}
