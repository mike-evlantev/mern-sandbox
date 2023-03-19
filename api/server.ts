import express, { ErrorRequestHandler, RequestHandler } from "express";
import { errorHandler } from "./middleware/error";
import testRoutes from "./routes/testRoutes";

require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/test', testRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;