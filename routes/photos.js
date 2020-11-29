const express = require('express');
const router = express.Router();

const { photoController } = require('../controller');

router.get('/', photoController.main.get);
router.post('/addphoto', photoController.addPhoto.post);
router.get('/:id', photoController.pickPhoto.get);
router.patch('/:id/modify', photoController.modifyPhoto.patch);
router.delete('/:id/delete', photoController.deletePhoto.delete);

module.exports = router;