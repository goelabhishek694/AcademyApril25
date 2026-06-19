import express from "express";
const app = express();
const PORT = 3000;

import healthRoutes from "./routes/health.js";
import movieRoutes from "./routes/movie.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";

// Express does not read JSON by default
// Request body comes as raw data
// We must explicitly tell Express:
// “Please parse JSON bodies”
//this function is a middleware. this code is going to run for each req
app.use(express.json());

//[ method , url(endpoint), handler function ] -> API
app.use("/healthy", healthRoutes);
app.use("/api/movies", movieRoutes);

//not found handler
app.use(notFound);

// global error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
