import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.js";
import movieRoutes from "./routes/movie.js";
import theatreRoutes from "./routes/theatre.js";
//that this line will load all the environment variables (from .env) file into process.env object
dotenv.config();

connectDB();
const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/theatres", theatreRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
