const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware')
const userMiddleware = require('../middlewares/userMiddleware')
//controllers
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signUp);

router.post('/signin', authController.signIn);


router.use(authMiddleware.protect)
router.patch(
    '/password/:id',
    authMiddleware.protectAccountOwner,
    userMiddleware.validUser,
    authController.updatePassword);


module.exports = router