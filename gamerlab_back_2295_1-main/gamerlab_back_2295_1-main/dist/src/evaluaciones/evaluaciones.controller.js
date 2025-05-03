"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluacionesController = void 0;
const common_1 = require("@nestjs/common");
const evaluaciones_service_1 = require("./evaluaciones.service");
let EvaluacionesController = class EvaluacionesController {
    evaluacionesService;
    constructor(evaluacionesService) {
        this.evaluacionesService = evaluacionesService;
    }
    async testConnection() {
        return {
            status: 'ok',
            message: 'Conexión exitosa al controlador de evaluaciones',
            fecha: new Date()
        };
    }
    getDatosEjemplo() {
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
    async getConsolidacionEvaluacion(id_videojuego) {
        return this.evaluacionesService.consolidarEvaluaciones(id_videojuego);
    }
    async getConsolidacionesTodosVideojuegos() {
        return this.evaluacionesService.listarConsolidacionesVideojuegos();
    }
    async getEvaluacionesVideojuego(id_videojuego) {
        return this.evaluacionesService.obtenerEvaluacionesVideojuego(id_videojuego);
    }
    async getJurados() {
        return this.evaluacionesService.obtenerJurados();
    }
    async getDatosAnalisis() {
        const consolidaciones = await this.evaluacionesService.listarConsolidacionesVideojuegos();
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
            criterios: obtenerComparativaCriterios(consolidaciones),
        };
        return datosAnalisis;
    }
    async getVisualizacionDashboard() {
        const consolidaciones = await this.evaluacionesService.listarConsolidacionesVideojuegos();
        const jurados = await this.evaluacionesService.obtenerJurados();
        const rankingVideojuegos = [...consolidaciones].sort((a, b) => b.promedio_total - a.promedio_total);
        const criterios = obtenerListaCriterios(consolidaciones);
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
    async getDetalleEvaluacion(id) {
        return {
            title: 'Detalle de Evaluación',
            id_videojuego: id
        };
    }
};
exports.EvaluacionesController = EvaluacionesController;
__decorate([
    (0, common_1.Get)('test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EvaluacionesController.prototype, "testConnection", null);
__decorate([
    (0, common_1.Get)('ejemplo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EvaluacionesController.prototype, "getDatosEjemplo", null);
__decorate([
    (0, common_1.Get)('consolidacion/:id_videojuego'),
    __param(0, (0, common_1.Param)('id_videojuego', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EvaluacionesController.prototype, "getConsolidacionEvaluacion", null);
__decorate([
    (0, common_1.Get)('consolidacion'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EvaluacionesController.prototype, "getConsolidacionesTodosVideojuegos", null);
__decorate([
    (0, common_1.Get)('evaluaciones/:id_videojuego'),
    __param(0, (0, common_1.Param)('id_videojuego', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EvaluacionesController.prototype, "getEvaluacionesVideojuego", null);
__decorate([
    (0, common_1.Get)('jurados'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EvaluacionesController.prototype, "getJurados", null);
__decorate([
    (0, common_1.Get)('analisis'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EvaluacionesController.prototype, "getDatosAnalisis", null);
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, common_1.Render)('dashboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EvaluacionesController.prototype, "getVisualizacionDashboard", null);
__decorate([
    (0, common_1.Get)('detalle'),
    (0, common_1.Render)('evaluacion-detalle'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EvaluacionesController.prototype, "getDetalleEvaluacion", null);
exports.EvaluacionesController = EvaluacionesController = __decorate([
    (0, common_1.Controller)('evaluaciones'),
    __metadata("design:paramtypes", [evaluaciones_service_1.EvaluacionesService])
], EvaluacionesController);
function obtenerComparativaCriterios(consolidaciones) {
    const todosLosCriterios = new Set();
    consolidaciones.forEach(c => {
        c.criterios.forEach(criterio => {
            todosLosCriterios.add(criterio.nombre);
        });
    });
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
function obtenerListaCriterios(consolidaciones) {
    const criteriosSet = new Set();
    consolidaciones.forEach(c => {
        c.criterios.forEach(criterio => {
            criteriosSet.add(criterio.nombre);
        });
    });
    return Array.from(criteriosSet);
}
//# sourceMappingURL=evaluaciones.controller.js.map