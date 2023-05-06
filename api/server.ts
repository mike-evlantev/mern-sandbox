import * as path from 'path';
import express from 'express';
import cors from 'cors';
import { connectMongoDb } from './config/mongodb';
import { errorHandler } from './middleware/error';
import orders from './routes/orders';
import stripe from './routes/stripe';
import users from './routes/users';
import gallery from './routes/galleryOrders';
import dotenv from 'dotenv';

dotenv.config();
connectMongoDb();

const app = express();

const corsOptions ={
   origin: process.env.CLIENT_DOMAIN, 
   credentials: true,            //access-control-allow-credentials:true
   optionSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/orders', orders);
app.use('/api/users', users);
app.use('/api/gallery', gallery);
app.use('/api/payments', stripe);

app.use(errorHandler);

// Server static (react) assets in production
if (process.env.NODE_ENV === 'production') {
   // Set static folder
   app.use(express.static(path.join(__dirname, '../../client/build')));
 
   // when home page route is hit load index.html
   app.get('/', (req, res) =>
     res.sendFile(path.join(__dirname, '../../client/build'))
   ); // look in /client/build/index.html
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;