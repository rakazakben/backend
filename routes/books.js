const express = require('express');
const Book = require('../models/book');
const bookController = require('../controllers/books');

const router = express.Router();

router.get(`/:id`, bookController.getBook);
router.get('/', bookController.getAllBooks);
router.post(`/`, bookController.createBook);
router.put(`/:id`, bookController.editBook);
router.delete(`/:id`, bookController.deleteBook);
router.get(`/bestrating`, bookController.getBestrating);
router.post(`/:id/rating`,bookController.getRating);


module.exports = router;