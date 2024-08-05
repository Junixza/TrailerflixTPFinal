const express = require('express');
const { sequelize } = require('./models');
const Pelicula = require('./routes/index');
const Serie = require('./routes/peliculas');
const Elenco = require('./routes/elenco');
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

// Uso de rutas
app.use('/api/peliculas', Pelicula);
app.use('/api/series', Serie);
app.use('/api/elenco', Elenco);

// Ejemplo de una ruta para renderizar una vista
app.get('/peliculas', async (req, res) => {
    try {
        const peliculas = await Pelicula.findAll();
        res.render('Pelicula', { peliculas });
    } catch (error) {
        res.status(500).send('Error al obtener las películas');
    }
});

app.get('/series', async (req, res) => {
    try {
        const series = await Serie.findAll(); // Asegúrate de importar el modelo Serie
        res.render('Serie', { series });
    } catch (error) {
        res.status(500).send('Error al obtener las series');
    }
});

app.get('/elenco', async (req, res) => {
    try {
        const elenco = await Elenco.findAll(); // Asegúrate de importar el modelo Serie
        res.render('Serie', { elenco });
    } catch (error) {
        res.status(500).send('Error al obtener las series');
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
