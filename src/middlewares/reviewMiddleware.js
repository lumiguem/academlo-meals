const catchAsync = require('../utils/catchAsync');
const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');
const User = require('../models/userModel');

exports.existReview = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const review = await Review.findOne({
        where: {
            id,
            status: 'active',
        },
        include: [
            {
                model: User,
            }
        ]
    });
    if (!review) {
        return next(new AppError(`Review with Id: ${id} not found`, 404));
    }
    req.review = review;
    req.user = review.user;
    next();
});