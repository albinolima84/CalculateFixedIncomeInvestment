const express = require('express');
const router = express.Router();
const importdataController = require('../controllers/import-data');

router.get('/', importdataController.get);
router.post('/', importdataController.post);

module.exports = router;