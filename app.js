const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const booksRoutes = require('./routes/books');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json()); 

mongoose.connect('mongodb+srv://rakazakben:QsmtmZQ7L3mntk8r@cluster0.igwdz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
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