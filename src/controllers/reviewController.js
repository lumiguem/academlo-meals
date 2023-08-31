const catchAsync = require('../utils/catchAsync');
const Review = require('../models/reviewModel');

exports.create = catchAsync(async (req, res, next) => {

    const { comment, rating } = req;
    const { id } = req.params;
    const { uid } = req.sessionUser.id;

    await Review.create({ comment, rating, restaurantId: +id, userId: +uid })

    return res.status(201).json({
        status: success,
        message: 'review created successfully'
    })
});

exports.update = catchAsync(async (req, res, next) => {

    const { review } = req;
    const { comment, rating } = req.body;

    await review.update({ comment, rating });


    return res.status(200).json({
        status: 'succes',
        message: 'review has been updated succesfully'
    })
});

exports.delete = catchAsync(async (req, res, next) => {
    const { review } = req;

    await review.update({ status: 'false' });


    return res.status(200).json({
        status: 'succes',
        message: 'review has been updated succesfully'
    })

});