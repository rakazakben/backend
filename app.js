const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.get('/api/books', (req, res, next) => {
    
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