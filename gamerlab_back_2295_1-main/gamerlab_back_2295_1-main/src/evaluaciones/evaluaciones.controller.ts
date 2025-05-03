import { Controller, Get, Param, ParseIntPipe, Render, Query } from '@nestjs/common';
import { EvaluacionesService } from './evaluaciones.service';
import { ConsolidacionEvaluacionDto } from './dto/consolidacion-evaluacion.dto';

@Controller('evaluaciones')
export class EvaluacionesController {
  constructor(private readonly evaluacionesService: EvaluacionesService) {}

  @Get('test')
  async testConnection() {
    return { 
      status: 'ok', 
      message: 'Conexión exitosa al controlador de evaluaciones',
      fecha: new Date() 
    };
  }

  @Get('ejemplo')
  getDatosEjemplo() {
    // Datos de ejemplo directamente en el controlador para pruebas sin dependencias
    return {
      videojuegos: [
        {
          id_videojuego: 1,
          nombre_videojuego: 'Space Adventure',
          equipo: 'Game Masters',
          promedio_total: 4.08,
          total_evaluaciones: 2,
          criterios: [
            { nombre: 'Interfaz de Usuario', promedio: 4.5 },
            { nombre: 'Interacción', promedio: 4.0 },
            { nombre: 'Resultados', promedio: 3.5 },
            { nombre: 'Presentación del Proyecto', promedio: 4.0 },
            { nombre: 'Funcionamiento del Programa', promedio: 4.5 },
            { nombre: 'Presentación personal del equipo', promedio: 4.0 }
          ]
        },
        {
          id_videojuego: 2,
          nombre_videojuego: 'Dungeon Escape',
          equipo: 'Pixel Warriors',
          promedio_total: 4.17,
          total_evaluaciones: 2,
          criterios: [
            { nombre: 'Interfaz de Usuario', promedio: 3.5 },
            { nombre: 'Interacción', promedio: 4.5 },
            { nombre: 'Resultados', promedio: 5.0 },
            { nombre: 'Presentación del Proyecto', promedio: 4.0 },
            { nombre: 'Funcionamiento del Programa', promedio: 3.5 },
            { nombre: 'Presentación personal del equipo', promedio: 4.5 }
          ]
        }
      ],
      timestamp: new Date()
    };
  }

  @Get('consolidacion/:id_videojuego')
  async getConsolidacionEvaluacion(
    @Param('id_videojuego', ParseIntPipe) id_videojuego: number
  ): Promise<ConsolidacionEvaluacionDto> {
    return this.evaluacionesService.consolidarEvaluaciones(id_videojuego);
  }

  @Get('consolidacion')
  async getConsolidacionesTodosVideojuegos(): Promise<ConsolidacionEvaluacionDto[]> {
    return this.evaluacionesService.listarConsolidacionesVideojuegos();
  }
  
  @Get('evaluaciones/:id_videojuego')
  async getEvaluacionesVideojuego(@Param('id_videojuego', ParseIntPipe) id_videojuego: number) {
    return this.evaluacionesService.obtenerEvaluacionesVideojuego(id_videojuego);
  }
  
  @Get('jurados')
  async getJurados() {
    return this.evaluacionesService.obtenerJurados();
  }
  
  @Get('analisis')
  async getDatosAnalisis() {
    const consolidaciones = await this.evaluacionesService.listarConsolidacionesVideojuegos();
    
    // Transformar datos para análisis
    const datosAnalisis = {
      videojuegos: consolidaciones.map(c => c.nombre_videojuego),
      promedios: consolidaciones.map(c => c.promedio_total),
      totalEvaluaciones: consolidaciones.map(c => c.total_evaluaciones),
      datosComparativos: {
        labels: consolidaciones.map(c => c.nombre_videojuego),
        datasets: [
          {
            label: 'Promedio Total',
            data: consolidaciones.map(c => c.promedio_total),
          },
          {
            label: 'Total Evaluaciones',
            data: consolidaciones.map(c => c.total_evaluaciones),
          }
        ]
      },
      // Datos por criterio (para cada criterio, promedios por videojuego)
      criterios: obtenerComparativaCriterios(consolidaciones),
    };
    
    return datosAnalisis;
  }

  @Get('dashboard')
  @Render('dashboard')
  async getVisualizacionDashboard() {
    const consolidaciones = await this.evaluacionesService.listarConsolidacionesVideojuegos();
    const jurados = await this.evaluacionesService.obtenerJurados();
    
    // Ordenar por promedio para el ranking
    const rankingVideojuegos = [...consolidaciones].sort((a, b) => b.promedio_total - a.promedio_total);
    
    // Obtener lista única de criterios para armar la tabla
    const criterios = obtenerListaCriterios(consolidaciones);
    
    // Determinar el progreso de evaluación (jurados que evaluaron vs total)
    const totalJurados = jurados.length;
    const progresoEvaluaciones = consolidaciones.map(c => ({
      id_videojuego: c.id_videojuego,
      nombre_videojuego: c.nombre_videojuego,
      jurados_evaluaron: c.total_evaluaciones,
      total_jurados: totalJurados,
      porcentaje_completado: Math.round((c.total_evaluaciones / totalJurados) * 100)
    }));
    
    return {
      title: 'Dashboard de Evaluaciones',
      consolidaciones,
      rankingVideojuegos,
      criterios,
      progresoEvaluaciones
    };
  }

  @Get('detalle')
  @Render('evaluacion-detalle')
  async getDetalleEvaluacion(@Query('id') id: string) {
    return {
      title: 'Detalle de Evaluación',
      id_videojuego: id
    };
  }
}

// Función auxiliar para obtener datos comparativos por criterio
function obtenerComparativaCriterios(consolidaciones: ConsolidacionEvaluacionDto[]) {
  // Obtener lista única de criterios
  const todosLosCriterios = new Set<string>();
  consolidaciones.forEach(c => {
    c.criterios.forEach(criterio => {
      todosLosCriterios.add(criterio.nombre);
    });
  });
  
  // Para cada criterio, crear un dataset
  return Array.from(todosLosCriterios).map(nombreCriterio => {
    const datosCriterio = {
      nombre: nombreCriterio,
      promedios: consolidaciones.map(c => {
        const criterio = c.criterios.find(cr => cr.nombre === nombreCriterio);
        return {
          videojuego: c.nombre_videojuego,
          promedio: criterio ? criterio.promedio : 0
        };
      })
    };
    
    return datosCriterio;
  });
}

// Función auxiliar para obtener lista única de criterios
function obtenerListaCriterios(consolidaciones: ConsolidacionEvaluacionDto[]): string[] {
  const criteriosSet = new Set<string>();
  consolidaciones.forEach(c => {
    c.criterios.forEach(criterio => {
      criteriosSet.add(criterio.nombre);
    });
  });
  return Array.from(criteriosSet);
} 