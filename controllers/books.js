const Book = require('../models/book');

exports.createBook = (req, res) => {
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
  };

exports.getBook = (req, res) => {
    Book.findOne({_id : req.params.id})
    .then(book => res.status(200).json(book))
    .catch(error => res.status(400).json(error));
  };

exports.getAllBooks = (req, res) => {
    Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({error}));
  };

exports.editBook =  (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: " Aucune donnée envoyée." });
    }
    Book.updateOne({ _id: req.params.id }, { ...req.body })
    .then(() => res.status(200).json({ message: 'livre modifié !'}))
    .catch(error => res.status(400).json({ error }));
  };

exports.deleteBook = (req, res) => {
    Book.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'livre supprimé !'}))
    .catch(error => res.status(400).json({ error }));
  };

exports.getBestrating = (req, res) => {
    Book.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'livre supprimé !'}))
    .catch(error => res.status(400).json({ error }));
  };

exports.getRating =  (req, res, next) => {
    
    next();
  };
