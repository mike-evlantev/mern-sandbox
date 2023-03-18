import express from "express";
import testRoutes from "./routes/testRoutes";

require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

app.use('/api/test', testRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;