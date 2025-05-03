import { Module } from '@nestjs/common';
import { EvaluacionesController } from './evaluaciones.controller';
import { EvaluacionesService } from './evaluaciones.service';
import { EvaluacionesMockService } from './evaluaciones.mock.service';

@Module({
  imports: [],
  controllers: [EvaluacionesController],
  providers: [
    {
      provide: EvaluacionesService,
      useClass: EvaluacionesMockService, // Usar el servicio mock para pruebas locales
    }
  ],
})
export class EvaluacionesModule {} 