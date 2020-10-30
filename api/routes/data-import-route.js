const express = require('express');
const router = express.Router();
const dataimportController = require('../controllers/data-import');

router.get('/', dataimportController.get);
router.post('/', dataimportController.post);

module.exports = router;