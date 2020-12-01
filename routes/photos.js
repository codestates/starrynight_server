const express = require('express');
const router = express.Router();
const multer = require('multer');
const { photoController } = require('../controller');

let storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, '../uploadImg/');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});

let upload = multer({ storage: storage });

router.get('/', photoController.main.get);
router.post('/addphoto', upload.single('img'), photoController.addPhoto.post);
router.get('/:id', photoController.pickPhoto.get);
router.patch('/:id/modify', photoController.modifyPhoto.patch);
router.delete('/:id/delete', photoController.deletePhoto.delete);

module.exports = router;