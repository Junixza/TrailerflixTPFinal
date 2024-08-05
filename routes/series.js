const express = require('express');
const router = express.Router();
const { Serie, Elenco } = require('../models'); // Asegúrate de importar los modelos necesarios

// Obtener todas las series
router.get('/', async (req, res) => {
    try {
        const series = await Serie.findAll();
        res.json(series);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener una serie por ID
router.get('/:id', async (req, res) => {
    try {
        const serie = await Serie.findByPk(req.params.id, {
            include: [Elenco] // Incluir el elenco si es necesario
        });
        if (serie) {
            res.json(serie);
        } else {
            res.status(404).json({ error: 'Serie no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener solo series
router.get('/solo', async (req, res) => {
    try {
        const series = await Serie.findAll({ where: { categoria: 'Serie' } });
        res.json(series);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
