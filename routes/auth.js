const express = require('express');
const user = require('../models/user');

const router = express.Router();
const userController = require('../controllers/user');

router.post(`/signup`, userController.signup );
router.post(`/login`, userController.login);

module.exports = router;
