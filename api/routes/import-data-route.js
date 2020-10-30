const express = require('express');
const router = express.Router();
const calculatorController = require('../controllers/import-data');

router.post('/', calculatorController.post);

module.exports = router;