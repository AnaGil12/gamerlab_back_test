import { PrismaService } from '../prisma/prisma.service';
import { ConsolidacionEvaluacionDto } from './dto/consolidacion-evaluacion.dto';
export declare class EvaluacionesService {
    private prisma;
    constructor(prisma: PrismaService);
    consolidarEvaluaciones(id_videojuego: number): Promise<ConsolidacionEvaluacionDto>;
    listarConsolidacionesVideojuegos(): Promise<ConsolidacionEvaluacionDto[]>;
    obtenerEvaluacionesVideojuego(id_videojuego: number): Promise<any>;
    obtenerJurados(): Promise<any>;
}
