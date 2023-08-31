const cors = require('cors')
const express = require('express');
const morgan = require('morgan');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const authRoute = require('./routes/authRoute');
const usersRoute = require('./routes/usersRoute');
const restaurantRoute = require('./routes/restaurantRoute');


const app = express();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// rutas

app.use('/api/v1/auths', authRoute);
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/restaurants', restaurantRoute)

app.all('*', (req, res, next) => {
    return next(new AppError(`Cant find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler);
module.exports = app;