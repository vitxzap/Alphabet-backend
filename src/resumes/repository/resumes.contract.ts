import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class ManipulateResumes {
  abstract read(): Promise<object>;
  abstract create(): Promise<void>;
  abstract delete(): Promise<void>;
  abstract update(): Promise<void>;
}
