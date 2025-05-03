"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Iniciando seed de datos...');
    await limpiarDatos();
    const usuario1 = await prisma.usuario.create({
        data: {
            primer_nombre: 'Juan',
            segundo_nombre: 'Carlos',
            primer_apellido: 'Gómez',
            segundo_apellido: 'Pérez',
            correo: 'juangomez@example.com',
            confirmado: true,
            token_confirmacion: 'token123',
            ultima_conexion: new Date(),
            password: 'password123',
            estado: true,
        },
    });
    const usuario2 = await prisma.usuario.create({
        data: {
            primer_nombre: 'María',
            segundo_nombre: 'Elena',
            primer_apellido: 'Sánchez',
            segundo_apellido: 'López',
            correo: 'mariasanchez@example.com',
            confirmado: true,
            token_confirmacion: 'token456',
            ultima_conexion: new Date(),
            password: 'password456',
            estado: true,
        },
    });
    const criterio1 = await prisma.criterio.create({
        data: {
            nombre: 'Jugabilidad',
            descripcion: 'Evaluación de la experiencia de juego y la facilidad de controles',
            fecha_creacion: new Date(),
            estado: true,
        },
    });
    const criterio2 = await prisma.criterio.create({
        data: {
            nombre: 'Diseño Gráfico',
            descripcion: 'Evaluación de la calidad visual y estética del juego',
            fecha_creacion: new Date(),
            estado: true,
        },
    });
    const criterio3 = await prisma.criterio.create({
        data: {
            nombre: 'Innovación',
            descripcion: 'Evaluación de elementos originales y creativos',
            fecha_creacion: new Date(),
            estado: true,
        },
    });
    const criterio4 = await prisma.criterio.create({
        data: {
            nombre: 'Narrativa',
            descripcion: 'Evaluación de la historia y desarrollo de personajes',
            fecha_creacion: new Date(),
            estado: true,
        },
    });
    const equipo1 = await prisma.equipo.create({
        data: {
            nombre: 'Game Masters',
            token_captcha: 'captcha123',
            estado_incripcion: true,
            fecha_creacion: new Date(),
            estado: true,
        },
    });
    const equipo2 = await prisma.equipo.create({
        data: {
            nombre: 'Pixel Warriors',
            token_captcha: 'captcha456',
            estado_incripcion: true,
            fecha_creacion: new Date(),
            estado: true,
        },
    });
    await prisma.integrante.create({
        data: {
            id_equipo: equipo1.id_equipo,
            primer_nombre: 'Pedro',
            correo: 'pedro@example.com',
            usuario_github: 'pedrogit',
            fecha_creacion: new Date(),
            estado: true,
        },
    });
    await prisma.integrante.create({
        data: {
            id_equipo: equipo1.id_equipo,
            primer_nombre: 'Ana',
            correo: 'ana@example.com',
            usuario_github: 'anagit',
            fecha_creacion: new Date(),
            estado: true,
        },
    });
    await prisma.integrante.create({
        data: {
            id_equipo: equipo2.id_equipo,
            primer_nombre: 'Luis',
            correo: 'luis@example.com',
            usuario_github: 'luisgit',
            fecha_creacion: new Date(),
            estado: true,
        },
    });
    await prisma.integrante.create({
        data: {
            id_equipo: equipo2.id_equipo,
            primer_nombre: 'Carla',
            correo: 'carla@example.com',
            usuario_github: 'carlagit',
            fecha_creacion: new Date(),
            estado: true,
        },
    });
    const videojuego1 = await prisma.videojuego.create({
        data: {
            id_equipo: equipo1.id_equipo,
            nombre: 'Space Adventure',
            descripcion: 'Un juego de aventuras espaciales con gráficos 3D',
            fecha_creacion: new Date(),
            estado: true,
        },
    });
    const videojuego2 = await prisma.videojuego.create({
        data: {
            id_equipo: equipo2.id_equipo,
            nombre: 'Dungeon Escape',
            descripcion: 'Un juego de escape de mazmorras con elementos de puzzle',
            fecha_creacion: new Date(),
            estado: true,
        },
    });
    const evaluacion1 = await prisma.evaluacion.create({
        data: {
            id_usuario: usuario1.id_usuario,
            id_videojuegos: videojuego1.id_videojuego,
            comentario: 'Buen juego en general, pero con algunos problemas de control',
            fecha_creacion: new Date(),
            estado: true,
        },
    });
    await prisma.criterio_evaluacion.create({
        data: {
            id_criterio: criterio1.id_criterio,
            id_evaluacion: evaluacion1.id_evaluacion,
            valoracion: '8.5',
            fecha_creacion: new Date(),
            estado: true,
        },
    });
    await prisma.criterio_evaluacion.create({
        data: {
            id_criterio: criterio2.id_criterio,
            id_evaluacion: evaluacion1.id_evaluacion,
            valoracion: '9.0',
            fecha_creacion: new Date(),
            estado: true,
        },
    });
    await prisma.criterio_evaluacion.create({
        data: {
            id_criterio: criterio3.id_criterio,
            id_evaluacion: evaluacion1.id_evaluacion,
            valoracion: '7.5',
            fecha_creacion: new Date(),
            estado: true,
        },
    });
    await prisma.criterio_evaluacion.create({
        data: {
            id_criterio: criterio4.id_criterio,
            id_evaluacion: evaluacion1.id_evaluacion,
            valoracion: '8.0',
            fecha_creacion: new Date(),
            estado: true,
        },
    });
    const evaluacion2 = await prisma.evaluacion.create({
        data: {
            id_usuario: usuario2.id_usuario,
            id_videojuegos: videojuego1.id_videojuego,
            comentario: 'Excelentes gráficos, buena historia, pero le falta innovación',
            fecha_creacion: new Date(),
            estado: true,
        },
    });
    await prisma.criterio_evaluacion.create({
        data: {
            id_criterio: criterio1.id_criterio,
            id_evaluacion: evaluacion2.id_evaluacion,
            valoracion: '7.5',
            fecha_creacion: new Date(),
            estado: true,
        },
    });
    await prisma.criterio_evaluacion.create({
        data: {
            id_criterio: criterio2.id_criterio,
            id_evaluacion: evaluacion2.id_evaluacion,
            valoracion: '9.5',
            fecha_creacion: new Date(),
            estado: true,
        },
    });
    await prisma.criterio_evaluacion.create({
        data: {
            id_criterio: criterio3.id_criterio,
            id_evaluacion: evaluacion2.id_evaluacion,
            valoracion: '6.5',
            fecha_creacion: new Date(),
            estado: true,
        },
    });
    await prisma.criterio_evaluacion.create({
        data: {
            id_criterio: criterio4.id_criterio,
            id_evaluacion: evaluacion2.id_evaluacion,
            valoracion: '8.5',
            fecha_creacion: new Date(),
            estado: true,
        },
    });
    const evaluacion3 = await prisma.evaluacion.create({
        data: {
            id_usuario: usuario1.id_usuario,
            id_videojuegos: videojuego2.id_videojuego,
            comentario: 'Muy innovador, pero con gráficos simples',
            fecha_creacion: new Date(),
            estado: true,
        },
    });
    await prisma.criterio_evaluacion.create({
        data: {
            id_criterio: criterio1.id_criterio,
            id_evaluacion: evaluacion3.id_evaluacion,
            valoracion: '8.0',
            fecha_creacion: new Date(),
            estado: true,
        },
    });
    await prisma.criterio_evaluacion.create({
        data: {
            id_criterio: criterio2.id_criterio,
            id_evaluacion: evaluacion3.id_evaluacion,
            valoracion: '6.5',
            fecha_creacion: new Date(),
            estado: true,
        },
    });
    await prisma.criterio_evaluacion.create({
        data: {
            id_criterio: criterio3.id_criterio,
            id_evaluacion: evaluacion3.id_evaluacion,
            valoracion: '9.5',
            fecha_creacion: new Date(),
            estado: true,
        },
    });
    await prisma.criterio_evaluacion.create({
        data: {
            id_criterio: criterio4.id_criterio,
            id_evaluacion: evaluacion3.id_evaluacion,
            valoracion: '7.0',
            fecha_creacion: new Date(),
            estado: true,
        },
    });
    const evaluacion4 = await prisma.evaluacion.create({
        data: {
            id_usuario: usuario2.id_usuario,
            id_videojuegos: videojuego2.id_videojuego,
            comentario: 'Excelente jugabilidad y narrativa, gráficos mejorables',
            fecha_creacion: new Date(),
            estado: true,
        },
    });
    await prisma.criterio_evaluacion.create({
        data: {
            id_criterio: criterio1.id_criterio,
            id_evaluacion: evaluacion4.id_evaluacion,
            valoracion: '9.0',
            fecha_creacion: new Date(),
            estado: true,
        },
    });
    await prisma.criterio_evaluacion.create({
        data: {
            id_criterio: criterio2.id_criterio,
            id_evaluacion: evaluacion4.id_evaluacion,
            valoracion: '7.0',
            fecha_creacion: new Date(),
            estado: true,
        },
    });
    await prisma.criterio_evaluacion.create({
        data: {
            id_criterio: criterio3.id_criterio,
            id_evaluacion: evaluacion4.id_evaluacion,
            valoracion: '8.5',
            fecha_creacion: new Date(),
            estado: true,
        },
    });
    await prisma.criterio_evaluacion.create({
        data: {
            id_criterio: criterio4.id_criterio,
            id_evaluacion: evaluacion4.id_evaluacion,
            valoracion: '9.0',
            fecha_creacion: new Date(),
            estado: true,
        },
    });
    console.log('Seed completado con éxito');
}
async function limpiarDatos() {
    await prisma.criterio_evaluacion.deleteMany({});
    await prisma.evaluacion.deleteMany({});
    await prisma.videojuego.deleteMany({});
    await prisma.integrante.deleteMany({});
    await prisma.equipo.deleteMany({});
    await prisma.criterio.deleteMany({});
    await prisma.usuario.deleteMany({});
    console.log('Datos previos eliminados');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map