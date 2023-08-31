const express = require('express');

//controllers
const restaurantController = require('../controllers/restaurantController');
const reviewController = require('../controllers/reviewController')

const authMiddleware = require('../middlewares/authMiddleware');
const restaurantMiddleware = require('../middlewares/restaurantMiddleware');
const reviewMiddleware = require('../middlewares/reviewMiddleware');

const router = express.Router();

router.route('/')
    .get(restaurantController.findAll)
    .post(authMiddleware.protect, authMiddleware.restrictTo('admin'), restaurantController.create)

router
    .route('/:id')
    .get(restaurantMiddleware.validRestaurant, restaurantController.findOne)
    .patch(restaurantMiddleware.validRestaurant, authMiddleware.protect, authMiddleware.restrictTo('admin'), restaurantController.update)
    .delete(restaurantMiddleware.validRestaurant, authMiddleware.protect, authMiddleware.restrictTo('admin'), restaurantController.delete);

router.use(authMiddleware.protect)

router.post(
    '/reviews/:id',
    restaurantMiddleware.validRestaurant,
    reviewController.create
)

router
    .use('/reviews/:restaurantId/:id',
        restaurantMiddleware.validRestaurant,
        reviewMiddleware.existReview
    )
    .route('/reviews/:restaurantId/:id')
    .patch(authMiddleware.protectAccountOwner, reviewController.update)
    .delete(authMiddleware.protectAccountOwner, reviewController.delete)


module.exports = router