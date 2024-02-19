import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { DataModule } from './data/data.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as cors from 'cors';

@Module({
  imports: [DataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes('*');
  }
}
