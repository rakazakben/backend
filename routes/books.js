const express = require('express');
const Book = require('../models/book');

const router = express.Router();

router.get(`/:id`, (req, res) => {
    Book.findOne({_id : req.params.id})
    .then(book => res.status(200).json(book))
    .catch(error => res.status(400).json(error));
  });
router.get('/', (req, res) => {
    Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({error}));
  });
router.post(`/`, (req, res) => {
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
router.put(`/:id`, (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: " Aucune donnée envoyée." });
    }
    Book.updateOne({ _id: req.params.id }, { ...req.body })
    .then(() => res.status(200).json({ message: 'livre modifié !'}))
    .catch(error => res.status(400).json({ error }));
  });
router.delete(`/:id`, (req, res) => {
    Book.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'livre supprimé !'}))
    .catch(error => res.status(400).json({ error }));
  });
router.get(`/bestrating`, (req, res, next) => {
    
    next();
  });
router.post(`/:id/rating`, (req, res, next) => {
    
    next();
  });


module.exports = router;