import { Module } from '@nestjs/common';
import { EvaluacionesModule } from './evaluaciones/evaluaciones.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    EvaluacionesModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
