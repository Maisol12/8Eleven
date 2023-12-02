const express = require('express');
const fs = require('fs');
const router = express.Router();
const jsonData = require('./puntos.json');



router.post('/guardar-producto', (req, res) => {
    try {
        // Verificar si el cuerpo de la solicitud es válido (no está vacío)
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Cuerpo de solicitud inválido' });
        }

        // Agregar el nuevo producto al array simulado de productos
        jsonData.push(req.body);

        // Escribir la lista actualizada de productos de nuevo al archivo JSON
        fs.writeFileSync('./puntos.json', JSON.stringify(jsonData, null, 2));

        console.log('Producto agregado correctamente.');
        
        // Responder con un mensaje de éxito
        res.json({ message: 'Punto agregado correctamente' });
    } catch (error) {
        console.error(error);
        // Responder con un error 500 en caso de excepción
        res.status(500).json({ error: 'Error al agregar el nuevo punto' });
    }
});

router.get('/lista-puntos', (req, res) => {
    try {
        // Obtén todos los puntos de venta del archivo JSON
        const puntosDeVenta = jsonData;

        // Devuelve la lista de puntos de venta como JSON
        res.json(puntosDeVenta);
    } catch (error) {
        // Maneja los errores
        console.error('Error al obtener los puntos de venta:', error);
        res.status(500).json({ error: 'Error Interno del Servidor' });
    }
});

router.put('/actualizar-punto', async (req, res) => { 
    try {
        // Verifica que se haya proporcionado un cuerpo de solicitud y un código de barras
        if (!req.body || !req.body.nombre) {
            return res.status(400).json({ error: 'Se requiere un nombre de un punto para esta solicitud' });
        }

        // Obtiene el código de barras a actualizar desde el cuerpo de la solicitud
        const nombreActualizar = req.body.nombre;

        // Busca el índice del punto de venta en la base de datos
        const indicePunto = jsonData.findIndex(item => item.nombre === nombreActualizar);

        // Verifica si el punto de venta existe
        if (indicePunto === -1) {
            return res.status(404).json({ error: 'Punto de venta no encontrado' });
        }

        // Actualiza los datos del punto de venta con la información proporcionada en el cuerpo de la solicitud
        jsonData[indicePunto] = { ...jsonData[indicePunto], ...req.body };

        fs.writeFileSync('./puntos.json', JSON.stringify(jsonData, null, 2));


        console.log('Punto de venta actualizado correctamente.');
        res.json({ message: 'Punto de venta actualizado correctamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el punto de venta' });
    }
});

router.delete('/eliminar-punto', (req, res) => {
    try {
        // Verifica que se haya proporcionado un cuerpo de solicitud y un nombre
        if (!req.body || !req.body.nombre) {
            return res.status(400).json({ error: 'Se requiere un nombre de un punto para esta solicitud' });
        }

        // Obtiene el nombre a eliminar desde el cuerpo de la solicitud
        const nombreEliminar = req.body.nombre;

        // Busca el índice del punto de venta en el arreglo por el nombre
        const indicePunto = jsonData.findIndex(item => item.nombre === nombreEliminar);

        // Verifica si el punto de venta existe
        if (indicePunto === -1) {
            return res.status(404).json({ error: 'Punto de venta no encontrado' });
        }

        // Elimina el punto de venta del arreglo
        jsonData.splice(indicePunto, 1);

        // Guarda los cambios en el archivo JSON
        fs.writeFileSync('./puntos.json', JSON.stringify(jsonData, null, 2));

        console.log('Punto de venta eliminado correctamente.');
        res.json({ message: 'Punto de venta eliminado correctamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el punto de venta' });
    }
});


module.exports = router;