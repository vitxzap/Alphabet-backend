import { Injectable } from '@nestjs/common';
import { ManipulateTemplates } from './templates.repository';
import { PrismaService } from 'src/database/prisma.service';

Injectable()
export class PrismaManipulationTemplates  implements ManipulateTemplates {
  constructor(private prisma: PrismaService) {}
  read(): Promise<object> {
    throw new Error('Method not implemented.');
  }
  create(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
