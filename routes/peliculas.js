const express = require('express');
const router = express.Router();
const { Pelicula, Elenco } = require('../models'); // Asegúrate de importar los modelos necesarios

// Obtener todas las películas
router.get('/peliculas', async (req, res) => {
    try {
        const peliculas = await Pelicula.findAll();
        res.json(peliculas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener una película por ID
router.get('/:id', async (req, res) => {
    try {
        const pelicula = await Pelicula.findByPk(req.params.id, {
            include: [Elenco] // Incluir el elenco si es necesario
        });
        if (pelicula) {
            res.json(pelicula);
        } else {
            res.status(404).json({ error: 'Película no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener solo películas
router.get('/solo', async (req, res) => {
    try {
        const peliculas = await Pelicula.findAll({ where: { categoria: 'Película' } });
        res.json(peliculas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
