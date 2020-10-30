const express = require('express');
const router = express.Router();
const calculatorController = require('../controllers/calculator');

router.post('/', calculatorController.post);

module.exports = router;