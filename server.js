const express = require('express');
const { sequelize, PeliculaSerie, Reparto, Actor } = require('./models');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3008;

// Configuración de vistas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Configuración de archivos estáticos
app.use(express.static(__dirname + '/public'));

// Middleware para JSON
app.use(express.json());

// Rutas de API
const peliculasRoutes = require('./routes/peliculas');
const seriesRoutes = require('./routes/series');
const repartoRoutes = require('./routes/reparto');

app.use('/api/peliculas', peliculasRoutes);
app.use('/api/series', seriesRoutes);
app.use('/api/reparto', repartoRoutes);

// Rutas para renderizar vistas
app.get('/peliculas', async (req, res) => {
    try {
        const peliculas = await PeliculaSerie.findAll({
            where: {
                categoria_id: 2 // Filtra por `categoria_id: 2`
            }
        });
        res.render('Pelicula', { peliculas }); // Asegúrate de que `Pelicula.ejs` esté bien configurado
    } catch (error) {
        console.error('Error al obtener las películas:', error);
        res.status(500).send('Error al obtener las películas');
    }
});

app.get('/series', async (req, res) => {
    try {
        const series = await PeliculaSerie.findAll({
            where: {
                categoria_id: 1 // Filtra por `categoria_id: 1`
            }
        });
        res.render('Series', { series }); // Asegúrate de que `series.ejs` esté bien configurado
    } catch (error) {
        console.error('Error al obtener las Series:', error);
        res.status(500).send('Error al obtener las Series');
    }
});

// Ruta para obtener información de un actor y sus trabajos
app.get('/actor/:id', async (req, res) => {
    const actorId = req.params.id;
    try {
        // Obtener información del actor
        const actor = await Actor.findByPk(actorId);
        if (!actor) {
            return res.status(404).send('Actor no encontrado');
        }

        // Obtener trabajos del actor
        const repartos = await Reparto.findAll({
            where: { actor_id: actorId },
            include: [
                {
                    model: PeliculaSerie,
                    attributes: ['titulo', 'poster', 'categoria_id', 'genero_id'] // Incluye los campos que necesites
                }
            ]
        });

        // Renderizar vista o enviar respuesta JSON
        res.render('ActorInfo', { actor, repartos }); // Asegúrate de que la vista 'ActorInfo.ejs' esté bien configurada
    } catch (error) {
        console.error('Error al obtener la información del actor:', error);
        res.status(500).send('Error al obtener la información del actor');
    }
});

// Ruta para buscar por nombre del actor
app.get('/buscarActor', async (req, res) => {
    const { nombre } = req.query; // Asegúrate de que el parámetro se pase como query string
    try {
        const actores = await Actor.findAll({
            where: {
                nombre: {
                    [Op.like]: `%${nombre}%`
                }
            }
        });

        res.render('BuscarActores', { actores }); // Asegúrate de que la vista 'BuscarActores.ejs' esté bien configurada
    } catch (error) {
        console.error('Error al buscar actores:', error);
        res.status(500).send('Error al buscar actores');
    }
});

const startServer = async () => {
    try {
        await sequelize.authenticate(); // Verificar conexión a la base de datos
        console.log('Conexión a la base de datos exitosa.');

        // Sincronizar la base de datos
        await sequelize.sync({ alter: true });
        console.log('Base de datos sincronizada.');

        // Iniciar el servidor
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('Error al conectar o sincronizar la base de datos:', error);
    }
};

startServer();
