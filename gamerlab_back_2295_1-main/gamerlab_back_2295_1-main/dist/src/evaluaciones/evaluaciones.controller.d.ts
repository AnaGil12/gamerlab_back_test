import { EvaluacionesService } from './evaluaciones.service';
import { ConsolidacionEvaluacionDto } from './dto/consolidacion-evaluacion.dto';
import { Response } from 'express';
export declare class EvaluacionesController {
    private readonly evaluacionesService;
    constructor(evaluacionesService: EvaluacionesService);
    testConnection(): Promise<{
        status: string;
        message: string;
        fecha: Date;
    }>;
    getDatosEjemplo(): {
        videojuegos: {
            id_videojuego: number;
            nombre_videojuego: string;
            equipo: string;
            promedio_total: number;
            total_evaluaciones: number;
            criterios: {
                nombre: string;
                promedio: number;
            }[];
        }[];
        timestamp: Date;
    };
    getConsolidacionEvaluacion(id_videojuego: number): Promise<ConsolidacionEvaluacionDto>;
    getConsolidacionesTodosVideojuegos(): Promise<ConsolidacionEvaluacionDto[]>;
    getEvaluacionesVideojuego(id_videojuego: number): Promise<any>;
    getJurados(): Promise<any>;
    getDatosAnalisis(): Promise<{
        videojuegos: string[];
        promedios: number[];
        totalEvaluaciones: number[];
        datosComparativos: {
            labels: string[];
            datasets: {
                label: string;
                data: number[];
            }[];
        };
        criterios: {
            nombre: string;
            promedios: {
                videojuego: string;
                promedio: number;
            }[];
        }[];
    }>;
    getAnalyticsData(): Promise<{
        top3Videojuegos: {
            nombre: string;
            promedio: number;
            equipo: string;
            id: number;
        }[];
        distribucionPorMateria: {
            nrc: string;
            promedio: number;
            cantidad: number;
        }[];
        videojuegos: {
            id: number;
            nombre: string;
            criterios: {
                nombre: string;
                promedio: number;
            }[];
            promedioTotal: number;
        }[];
    }>;
    getVisualizacionDashboard(): Promise<{
        title: string;
        consolidaciones: ConsolidacionEvaluacionDto[];
        rankingVideojuegos: ConsolidacionEvaluacionDto[];
        criterios: string[];
        progresoEvaluaciones: {
            id_videojuego: number;
            nombre_videojuego: string;
            jurados_evaluaron: number;
            total_jurados: any;
            porcentaje_completado: number;
        }[];
    }>;
    exportToExcel(res: Response): Promise<void>;
    exportToPdf(res: Response): Promise<void>;
    getDetalleEvaluacion(id: string): Promise<{
        title: string;
        id_videojuego: string;
    }>;
}
