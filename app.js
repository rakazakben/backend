const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/book');

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
app.get(`/api/books/:id`, (req, res) => {
    Book.findOne({_id : req.params.id})
    .then(book => res.status(200).json(book))
    .catch(error => res.status(400).json(error));
  });
app.get('/api/books', (req, res) => {
    Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({error}));
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
app.post(`/api/books`, (req, res) => {
    console.log("Requête reçue avec body :", req.body); // Debugging

    if (!req.body) {
        return res.status(400).json({ message: " Aucun contenu reçu" });
    }

    delete req.body._id;
    const book = new Book({
      ...req.body
    });
    book.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  });
app.post(`/api/books/:id/rating`, (req, res, next) => {
    
    next();
  });
app.put(`/api/books/:id`, (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: " Aucune donnée envoyée." });
    }
    Book.updateOne({ _id: req.params.id }, { ...req.body })
    .then(() => res.status(200).json({ message: 'livre modifié !'}))
    .catch(error => res.status(400).json({ error }));
  });
app.delete(`/api/books/:id`, (req, res) => {
    Book.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'livre supprimé !'}))
    .catch(error => res.status(400).json({ error }));
  });

/*app.use((req, res) => {
    res.json({ message: 'Votre requête a bien été reçue lol !' }); 
 });*/


module.exports = app;