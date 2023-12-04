const express = require('express');
const fs = require('fs');
const router = express.Router();
const jsonData = require('./productos.json');

router.get('/leer-producto', (req, res) => {
    try {
        if (!req.body.cod_barras) {
            return res.status(400).json({ error: 'Se requiere un código de barras en el cuerpo de la solicitud' });
        }

        const producto = jsonData.find(item => item.cod_barras === req.body.cod_barras);

        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json(producto);
    } catch (error) {
        res.status(500).json({ error: 'Error al leer el archivo JSON' });
    }
});

router.post('/guardar-producto', (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Cuerpo de solicitud inválido' });
        }

        jsonData.push(req.body);

        fs.writeFileSync('./productos.json', JSON.stringify(jsonData, null, 2));

        console.log('Producto agregado correctamente.');
        res.json({ message: 'Producto agregado correctamente2' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar el nuevo producto' });
    }
});

router.put('/actualizar-producto', async (req, res) => {
    try {
        if (!req.body || !req.body.cod_barras) {
            return res.status(400).json({ error: 'Se requiere un código de barras en el cuerpo de la solicitud' });
        }

        const codBarrasActualizar = req.body.cod_barras;

        const indiceProducto = jsonData.findIndex(item => item.cod_barras === codBarrasActualizar);

        if (indiceProducto === -1) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        jsonData[indiceProducto] = { ...jsonData[indiceProducto], ...req.body };

        fs.writeFileSync('./productos.json', JSON.stringify(jsonData, null, 2));

        console.log('Producto actualizado correctamente.');
        res.json({ message: 'Producto actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});

module.exports = router;
