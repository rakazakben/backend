const express = require('express');
const Book = require('../models/book');
const bookController = require('../controllers/books');
const auth = require('../controllers/auth');
const multer = require('../controllers/multer-config');

const router = express.Router();

router.get(`/bestrating`, bookController.getBestrating);
router.get(`/:id`, bookController.getBook);
router.get('/', bookController.getAllBooks);
router.post(`/`, auth,multer.upload, multer.compressImage, bookController.createBook);
router.put(`/:id`, auth, multer.upload,multer.compressImage, bookController.editBook);
router.delete(`/:id`, auth, bookController.deleteBook);

router.post(`/:id/rating`,auth, bookController.Rating);


module.exports = router;