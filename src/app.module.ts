import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { DataModule } from './data/data.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as cors from 'cors'; // Убедитесь, что вы установили пакет cors через npm или yarn

@Module({
  imports: [DataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes('*'); // Применение CORS ко всем маршрутам
  }
}
