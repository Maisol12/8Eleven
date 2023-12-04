const express = require('express');
const fs = require('fs');
const router = express.Router();
const jsonData = require('./datos.json');

router.get('/leer-usuario', (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(400).json({ error: 'Se requiere un ID en el cuerpo de la solicitud' });
        }

        const elemento = jsonData.find(item => item.id === req.body.id);

        if (!elemento) {
            return res.status(404).json({ error: 'Elemento no encontrado' });
        }

        res.json(elemento);
    } catch (error) {
        res.status(500).json({ error: 'Error al leer el archivo JSON' });
    }
});

router.post('/guardar-usuario', (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Cuerpo de solicitud inválido' });
        }

        jsonData.push(req.body);

        fs.writeFileSync('./datos.json', JSON.stringify(jsonData, null, 2));

        console.log('Elemento agregado correctamente.');
        res.json({ message: 'Elemento agregado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar el nuevo elemento' });
    }
});

router.put('/actualizar-usuario', async (req, res) => {
    try {
        if (!req.body || !req.body.id) {
            return res.status(400).json({ error: 'Se requiere un ID en el cuerpo de la solicitud' });
        }

        const idActualizar = req.body.id;

        const indiceElemento = jsonData.findIndex(item => item.id === idActualizar);

        if (indiceElemento === -1) {
            return res.status(404).json({ error: 'Elemento no encontrado' });
        }

        jsonData[indiceElemento] = { ...jsonData[indiceElemento], ...req.body };

        fs.writeFileSync('./datos.json', JSON.stringify(jsonData, null, 2));

        console.log('Elemento actualizado correctamente.');
        res.json({ message: 'Elemento actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el elemento' });
    }
});

module.exports = router;
