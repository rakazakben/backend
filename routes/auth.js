const express = require('express');
const user = require('../models/user');

const router = express.Router();

router.post(`/signup`, (req, res, next) => {
    
    next();
  });
router.post(`/login`, (req, res, next) => {
    
    next();
  });

  module.exports = router;
