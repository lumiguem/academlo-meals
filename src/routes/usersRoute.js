const express = require('express');
const userMiddleware = require('../middlewares/userMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

//controllers
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.findAllUsers)

router
    .use('/:id', userMiddleware.validUser)
    .route('/:id')
    .get(userController.findOneUser)
    .patch(authMiddleware.protectAccountOwner, validationMiddleware.updateUserValidation, userController.updateUser)
    .delete(authMiddleware.protectAccountOwner, userController.deleteUser);


module.exports = router;