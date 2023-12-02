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

router.get('./lista-puntos',async (req,res) => { // No jala no se por que, dice el postman que no existe y aqui esta, maten a los negros
    try {
        // Obtén todos los puntos de venta de la base de datos
        const puntosDeVenta = await PuntoDeVenta.find();

        // Devuelve la lista de puntos de venta como JSON
        res.json(puntosDeVenta);
    } catch (error) {
        // Maneja los errores
        console.error('Error al obtener los puntos de venta:', error);
        res.status(500).json({ error: 'Error Interno del Servidor' });
    }
});

router.put('/actualizar-punto', async (req, res) => { // Igual No jala no se por que, dice el postman que no existe y aqui esta, maten a los negros
    try {
        // Verifica que se haya proporcionado un cuerpo de solicitud y un código de barras
        if (!req.body || !req.body.cod_barras) {
            return res.status(400).json({ error: 'Se requiere un nombre de un punto para esta solicitud' });
        }

        // Obtiene el código de barras a actualizar desde el cuerpo de la solicitud
        const nombreActualizar = req.body.nombre;

        // Busca el índice del punto de venta en la base de datos
        const puntoDeVenta = await PuntoDeVenta.findOne({ nombre: nombreActualizar });

        // Verifica si el punto de venta existe
        if (!puntoDeVenta) {
            return res.status(404).json({ error: 'Punto de venta no encontrado' });
        }

        // Actualiza los datos del punto de venta con la información proporcionada en el cuerpo de la solicitud
        await PuntoDeVenta.updateOne({ nombre: nombreActualizar }, { $set: req.body });

        console.log('Punto de venta actualizado correctamente.');
        res.json({ message: 'Punto de venta actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el punto de venta' });
    }
});
module.exports = router;