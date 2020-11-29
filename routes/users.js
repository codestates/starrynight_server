const express = require('express');
const router = express.Router();

const { userController } = require('../controller');

router.post('/signin', userController.signin.post);
router.post('/signup', userController.signup.post);
router.post('/signout', userController.signout.post);
router.post('/find/email', userController.findUser.email);
router.post('/find/password', userController.findUser.password);
router.get('/mypage', userController.mypage.info);
router.patch('/modify/nickname', userController.modify.nickname);
router.patch('/modify/password', userController.modify.password);
router.patch('/modify/mobile', userController.modify.mobile);
router.patch('/modify/profile', userController.modify.profile);
router.get('/delete', userController.deleteUser.delete);
router.get('/gallery', userController.gallery.get);
router.get('/favorite', userController.favorite.get);

module.exports = router;