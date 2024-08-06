const express = require('express');
const router = express.Router();
const { PeliculaSerie } = require('../models'); // Asegúrate de que la importación sea correcta

console.log(PeliculaSerie)
// Obtener todas las películas
router.get('/peliculas', async (req, res) => {
    try {
        // Buscar películas donde el campo 'temporadas' es null o vacío
        const peliculas = await PeliculaSerie.findAll({
            where: {
                temporadas: {
                    [Op.or]: [null, ''] // Filtrar por temporadas que sean null o vacío
                }
            }
        });

        // Renderizar la vista y pasar las películas
        res.render('Pelicula', { peliculas });
    } catch (error) {
        console.error('Error al obtener las películas:', error);
        res.status(500).send('Error al obtener las películas');
    }
});

module.exports = router;
