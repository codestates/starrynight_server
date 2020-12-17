const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const { userController } = require('../controller');

aws.config.loadFromPath(__dirname + '/../config/awsconfig.json');

let s3 = new aws.S3();
let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'mystar-story.com/uploadPhotos/profilePhotos',

    key: function (req, file, cb) {
      cb(null, `${Date.now()}_${494}`);
    },

    contentLength: 5000000, // 5mb
    acl: 'public-read-write',
    contentType: multerS3.AUTO_CONTENT_TYPE
  })
});

router.post('/signin', userController.signin.post);
router.get('/signin/google', userController.signin.google);
router.get('/signin/kakao', userController.signin.kakao);
router.post('/signup',upload.single("file"), userController.signup.post);
router.post('/signout', userController.signout.post);
router.post('/find/email', userController.findUser.email);
router.post('/find/password', userController.findUser.password);
router.get('/mypage', userController.mypage.info);
router.patch('/modify/nickname', userController.modify.nickname);
router.patch('/modify/password', userController.modify.password);
router.patch('/modify/mobile', userController.modify.mobile);
router.patch('/modify/profile', upload.single("file"), userController.modify.profile);
router.get('/delete', userController.deleteUser.delete);
router.get('/gallery', userController.gallery.get);
router.get('/favorite', userController.favorite.get);

module.exports = router;
