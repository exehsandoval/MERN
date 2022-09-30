const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
require('dotenv').config();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

// Configuracion de base de datos
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => { console.log("Base de datos conectada")});

// Configuracion de rutas
app.use('/api/category', require('./routes/category'));
app.use('/api/videogame', require('./routes/videogame'));
app.use('/api/auth', require('./routes/auth'));

// Lista de Puertos
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Servidor de videojuegos MERN esta ejecutando en el puerto ${port}`);
})