const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: './config.env' });

const booksRoutes = require('./routes/books');
const authRoutes = require('./routes/auth');
const dbLink = process.env.DB_LINK;

const app = express();
app.use(express.json()); 

mongoose.connect(dbLink,
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/books', booksRoutes);
app.use('/api/auth', authRoutes);


module.exports = app;