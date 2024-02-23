import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// IMPORTING ROUTES
import AuthRoute from './Routes/AuthRoute.js'
import userRoute from './Routes/UserRoute.js'
import BlogsRoute from './Routes/BlogsRoute.js'

const app = express();

// MIDDLEWARES
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));

dotenv.config()

const CONNECTION = process.env.MONGODB_URL;
const PORT = process.env.PORT;

mongoose.connect(CONNECTION)
    .then(() => 
    app.listen(PORT, () => console.log(`Database Connected to port: ${PORT}`)))
    .catch((error) => console.log(error));

app.use('/auth', AuthRoute);
app.use('/user', userRoute);
app.use('/blog', BlogsRoute);