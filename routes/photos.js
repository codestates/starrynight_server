const express = require('express');
const router = express.Router();

const { photoController } = require('../controller');

router.get('/', photoController.main.get);

module.exports = router;