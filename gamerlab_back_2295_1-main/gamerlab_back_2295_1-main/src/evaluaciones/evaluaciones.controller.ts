import { Controller, Get, Param, ParseIntPipe, Render, Query, Res, HttpStatus } from '@nestjs/common';
import { EvaluacionesService } from './evaluaciones.service';
import { ConsolidacionEvaluacionDto } from './dto/consolidacion-evaluacion.dto';
import { Response } from 'express';

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

  @Get('analytics')
  async getAnalyticsData() {
    const consolidaciones = await this.evaluacionesService.listarConsolidacionesVideojuegos();
    
    // Top 3 videojuegos
    const top3Videojuegos = [...consolidaciones]
      .sort((a, b) => b.promedio_total - a.promedio_total)
      .slice(0, 3);
    
    // Obtener lista de materias (asumiendo que la materia se almacena en algún atributo)
    // Por ahora simulamos esta información
    const materiasPorVideojuego = consolidaciones.map(c => ({
      id_videojuego: c.id_videojuego,
      nombre_videojuego: c.nombre_videojuego,
      nrc: Math.floor(Math.random() * 5) + 1, // Simulación: asigna un NRC del 1 al 5
      promedio: c.promedio_total
    }));
    
    // Agrupar por NRC para distribución por materia
    const nrcs = [...new Set(materiasPorVideojuego.map(m => m.nrc))];
    const distribucionPorNRC = nrcs.map(nrc => {
      const videojuegosPorNRC = materiasPorVideojuego.filter(m => m.nrc === nrc);
      return {
        nrc: `NRC-${nrc}`,
        promedio: videojuegosPorNRC.reduce((sum, vj) => sum + vj.promedio, 0) / videojuegosPorNRC.length,
        cantidad: videojuegosPorNRC.length
      };
    });
    
    return {
      top3Videojuegos: top3Videojuegos.map(vj => ({
        nombre: vj.nombre_videojuego,
        promedio: vj.promedio_total,
        equipo: vj.equipo,
        id: vj.id_videojuego
      })),
      distribucionPorMateria: distribucionPorNRC,
      // Para los gráficos por videojuego
      videojuegos: consolidaciones.map(vj => ({
        id: vj.id_videojuego,
        nombre: vj.nombre_videojuego,
        criterios: vj.criterios.map(c => ({
          nombre: c.nombre,
          promedio: c.promedio
        })),
        promedioTotal: vj.promedio_total
      }))
    };
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

  @Get('exportar_excel')
  async exportToExcel(@Res() res: Response) {
    try {
      // Simplemente retorna un mensaje de éxito
      res.status(HttpStatus.OK).json({
        success: true,
        message: 'Exportación a Excel simulada correctamente',
        fecha: new Date()
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error simulado en exportación a Excel',
        error: error.message
      });
    }
  }

  @Get('exportar_pdf')
  async exportToPdf(@Res() res: Response) {
    try {
      // Simplemente retorna un mensaje de éxito
      res.status(HttpStatus.OK).json({
        success: true,
        message: 'Exportación a PDF simulada correctamente',
        fecha: new Date()
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error simulado en exportación a PDF',
        error: error.message
      });
    }
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