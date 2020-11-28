const express = require('express');
const router = express.Router();

const { userController } = require('../controller');

router.get('/signin', userController.signin.get);

module.exports = router;