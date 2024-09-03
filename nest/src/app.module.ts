import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OwnController } from './own/own.controller';
import { OwnService } from './own/own.service';
import { OwnModule } from './own/own.module';

@Module({
  imports: [OwnModule],
  controllers: [AppController, OwnController],
  providers: [AppService, OwnService],
})
export class AppModule {}
