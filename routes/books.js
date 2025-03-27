const express = require('express');
const Book = require('../models/book');
const bookController = require('../controllers/books');
const auth = require('../controllers/auth');

const router = express.Router();

router.get(`/:id`, bookController.getBook);
router.get('/', bookController.getAllBooks);
router.post(`/`, auth, bookController.createBook);
router.put(`/:id`, auth, bookController.editBook);
router.delete(`/:id`, auth, bookController.deleteBook);
router.get(`/bestrating`, bookController.getBestrating);
router.post(`/:id/rating`,auth, bookController.Rating);


module.exports = router;