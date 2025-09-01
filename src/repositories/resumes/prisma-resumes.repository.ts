import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ManipulateResumes } from './resumes.repository';

@Injectable()
export class PrismaManipulationResumes implements ManipulateResumes {
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
