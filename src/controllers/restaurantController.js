const catchAsync = require('../utils/catchAsync');
const Restaurant = require('../models/restaurantModel');

exports.findAll = catchAsync(async (req, res, next) => {
    const restaurants = await Restaurant.findAll({
        where: {
            status: 'active',
        },
    });

    res.status(200).json({
        status: 'success',
        results: restaurants.length,
        restaurants,

    });

});

exports.create = catchAsync(async (req, res, next) => {
    const { name, address, rating } = req.body;
    const restaurant = await Restaurant.create({
        name,
        address,
        rating,
    })

    return res.status(201).json({
        status: 'success',
        message: 'The restaurant has been created',
        restaurant,
    })
});

exports.findOne = catchAsync(async (req, res, next) => {
    const { restaurant } = req;

    return res.status(200).json({
        status: 'success',
        restaurant
    })
});

exports.update = catchAsync(async (req, res, next) => {
    const { restaurant } = req;
    const { name, address } = req.body;
    await restaurant.update({
        name,
        address,
    });

    return res.status(200).json({
        status: 'success',
        message: 'Restaurant updated successfully'
    })
});

exports.delete = catchAsync(async (req, res, next) => {
    const { restaurant } = req;
    await restaurant.update({
        status: 'disabled',
    })
    return res.status(200).json({
        status: 'success',
        message: 'Restaurant deleted successfully'
    })
});