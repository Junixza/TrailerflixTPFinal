const express = require('express');
const router = express.Router();
const { Elenco } = require('../models'); // Asegúrate de importar el modelo necesario

// Obtener todos los elencos
router.get('/', async (req, res) => {
    try {
        const elencos = await Elenco.findAll();
        res.json(elencos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un elenco por ID
router.get('/:id', async (req, res) => {
    try {
        const elenco = await Elenco.findByPk(req.params.id);
        if (elenco) {
            res.json(elenco);
        } else {
            res.status(404).json({ error: 'Elenco no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
