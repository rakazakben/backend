const Book = require('../models/book');
const fs = require('fs');

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
    } : { ...req.body };//à retirer
    
    delete bookObject.userId;
    Book.findOne({_id: req.params.id})
       .then((book) => {
           if (book.userId != req.auth.userId) {
               res.status(401).json({ message : 'Not authorized'});
           }
           let bookObject;

           if (req.file) {
               // Supprimer l'ancienne image
               const oldFilename = book.imageUrl.split('/images/')[1];
               fs.unlink(`images/${oldFilename}`, (err) => {
                   if (err) {
                       console.error("Erreur suppression image :", err);
                   }
               });

               // Mettre à jour avec la nouvelle image
               bookObject = {
                   ...JSON.parse(req.body.book),
                   imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
               };
           } else {
               bookObject = { ...req.body };
           }

           delete bookObject.userId; // Empêcher la modification de l'userId 
        
            return  Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
               .then(() => res.status(200).json({message : 'livre modifié!'}))
               .catch(error => res.status(401).json({ error }));
           
       })
       .catch((error) => {
           res.status(400).json({ error });
       });
  };

exports.deleteBook = (req, res) => {
    Book.findOne({ _id: req.params.id})
       .then(book => {
           if (book.userId != req.auth.userId) {
               res.status(401).json({message: 'non autorisé'});
           } else {
               const filename = book.imageUrl.split('/images/')[1];
               fs.unlink(`images/${filename}`, () => {
                Book.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'livre supprimé !'}))//revoir les codes status
                .catch(error => res.status(400).json({ error }));
               });
           }
       })
       .catch( error => {
           res.status(500).json({ error });
       });
    
  };

exports.getBestrating = (req, res, next) => {
    Book.find()
        .sort({ averageRating: -1 }) // Trie par note moyenne décroissante (du + grand au + petit)
        .limit(3) // Limite le résultat à 3 livres
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
    
  };

exports.Rating =  (req, res, next) => {
    // const { userId, rating } = req.body; // Récupérer l'ID utilisateur et la note
    delete req.body.userId;
    const userId= req.auth.userId;
    const rating = req.body.rating;

    if (!userId || rating === undefined) {
        return res.status(400).json({ message: "userId et rating sont requis." });
    }

    if (rating < 0 || rating > 5) {
        return res.status(400).json({ message: "La note doit être comprise entre 0 et 5." });
    }

    // Trouver le livre par ID
    Book.findById(req.params.id)
        .then(book => {
            if (!book) {
                return res.status(404).json({ message: "Livre non trouvé." });
            }

            // Vérifier si l'utilisateur a déjà noté le livre
            const hasRated = book.ratings.some(r => r.userId === userId);
            if (hasRated) {
                return res.status(400).json({ message: "Vous avez déjà noté ce livre." });
            }

            // Ajouter la note au tableau ratings
            book.ratings.push({ userId, grade: rating });

            // Calculer la nouvelle moyenne des notes
            const totalRatings = book.ratings.length;
            const sumRatings = book.ratings.reduce((acc, r) => acc + r.grade, 0);
            book.averageRating = Number((sumRatings / totalRatings).toFixed(1)); //correction des nombres significatifs

            // Sauvegarder le livre mis à jour
            return book.save();
        })
        .then(updatedBook => res.status(200).json(updatedBook))
        .catch(error => res.status(500).json({ error }));
    
  };
