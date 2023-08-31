const Meal = require("./mealModel");
const Order = require("./orderModel");
const Restaurant = require("./restaurantModel");
const Review = require("./reviewModel");
const User = require("./userModel");

const initModel = () => {
    User.hasMany(Order);
    Order.belongsTo(User);

    User.hasMany(Review);
    Review.belongsTo(User);

    Restaurant.hasMany(Review);
    Review.belongsTo(Restaurant);

    Restaurant.hasMany(Meal);
    Meal.belongsTo(Restaurant);

    Meal.hasOne(Order);
    Order.belongsTo(Meal);

}

module.exports = initModel;