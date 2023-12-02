const express = require('express');
const cors = require('cors');
const usersRouter = require('./users');
const productsRouter = require('./products');
const puntosRouter = require('./puntos');

const app = express();
const port = 3001;

const corsOptions = {
    origin: 'http://127.0.0.1:5500', // Cambia esto con la URL de tu página HTML
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use('/users', usersRouter); // Rutas relacionadas con usuarios
app.use('/products', productsRouter); // Rutas relacionadas con productos
app.use('/puntos', puntosRouter); // Rutas relacionadas con puntos de venta

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
