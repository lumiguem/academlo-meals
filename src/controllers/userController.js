const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.findAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.findAll({
        where: {
            status: 'active',
        },
    });

    res.status(200).json({
        status: 'success',
        users,
    });
});

exports.findOneUser = catchAsync(async (req, res, next) => {
    const { user } = req;

    res.status(200).json({
        status: 'success',
        user,
    });
});
exports.updateUser = catchAsync(async (req, res, next) => {
    const { user } = req;
    const { name, email } = req.body;
    await user.update({
        name,
        email,
    });

    res.status(200).json({
        status: 'success',
        message: 'User updated successfully',
    });
});
exports.deleteUser = catchAsync(async (req, res, next) => {
    const { user } = req;
    await user.update({
        status: 'disabled',
    });

    return res.status(200).json({
        status: 'success',
        message: 'User deleted successfully',
    });
});
