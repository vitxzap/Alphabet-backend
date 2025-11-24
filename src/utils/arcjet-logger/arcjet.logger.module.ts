import { Global, Module } from '@nestjs/common';
import { ArcjetLogger } from './arcjet.logger.service';

@Global()
@Module({
  providers: [ArcjetLogger],
  exports: [ArcjetLogger],
})
export class ArcjetLoggerModule {}
