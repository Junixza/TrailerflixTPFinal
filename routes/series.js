const express = require('express');
const router = express.Router();
const { PeliculaSerie } = require('../models'); // Asegúrate de que la importación sea correcta

console.log(PeliculaSerie)
// Obtener todas las películas
router.get('/series', async (req, res) => {
    try {
        // Buscar películas donde el campo 'temporadas' es null o vacío
        const series = await PeliculaSerie.findAll({
            where: {
                temporadas: {
                    [Op.gt]: 0
                }
            }
        });

        // Renderizar la vista y pasar las películas
        res.render('Pelicula', { series });
    } catch (error) {
        console.error('Error al obtener las películas:', error);
        res.status(500).send('Error al obtener las películas');
    }
});

module.exports = router;
