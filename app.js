const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/book');

const app = express();

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

app.get('/api/books', (req, res, next) => {
    Book.find()
    .then(books => res.status(200).json(thing))
    .catch(error => res.status(400).json({error}));
    next();
  });

app.get(`/api/books/:id`, (req, res, next) => {
    //variable id
    next();
  });
app.get(`/api/books/bestrating`, (req, res, next) => {
    
    next();
  });
app.post(`/api/auth/signup`, (req, res, next) => {
    
    next();
  });
app.post(`/api/auth/login`, (req, res, next) => {
    
    next();
  });
app.post(`/api/books`, (req, res, next) => {
    
    next();
  });
app.post(`/api/books/:id/rating`, (req, res, next) => {
    
    next();
  });
app.put(`/api/books/:id`, (req, res, next) => {
    
    next();
  });
app.delete(`/api/books/:id`, (req, res, next) => {
    
    next();
  });

app.use((req, res) => {
    res.json({ message: 'Votre requête a bien été reçue lol !' }); 
 });


module.exports = app;