import express from "express";
import { connectMongoDb } from "./config/mongodb";
import { errorHandler } from "./middleware/error";
import orders from "./routes/orders";

require('dotenv').config();

const port = process.env.PORT || 5000;

connectMongoDb();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/orders', orders);

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;