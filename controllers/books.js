const Book = require('../models/book');

exports.createBook = (req, res) => {
    console.log("Requête reçue avec body :", req.body); //à retirer

    if (!req.body) {
        return res.status(400).json({ message: " Aucun contenu reçu" });
    }
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject.userId;
    
    const book = new Book({
      ...bookObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    book.save()
      .then(() => res.status(201).json({ message: 'livre enregistré !'}))
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
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete bookObject.userId;
    Book.findOne({_id: req.params.id})
       .then((book) => {
           if (book.userId != req.auth.userId) {
               res.status(401).json({ message : 'Not authorized'});
           } else {
               Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
               .then(() => res.status(200).json({message : 'livre modifié!'}))
               .catch(error => res.status(401).json({ error }));
           }
       })
       .catch((error) => {
           res.status(400).json({ error });
       });
    /*
    Book.updateOne({ _id: req.params.id }, { ...req.body })
    .then(() => res.status(200).json({ message: 'livre modifié !'}))
    .catch(error => res.status(400).json({ error }));*/
  };

exports.deleteBook = (req, res) => {
    Book.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'livre supprimé !'}))//revoir les codes status
    .catch(error => res.status(400).json({ error }));
  };

exports.getBestrating = (req, res, next) => {
    
    next();
  };

exports.Rating =  (req, res, next) => {
    
    next();
  };
