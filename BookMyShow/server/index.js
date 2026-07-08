import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.js";
import movieRoutes from "./routes/movie.js";
import theatreRoutes from "./routes/theatre.js";
import showRoutes from "./routes/show.js";
import bookingRoutes from "./routes/booking.js";

//that this line will load all the environment variables (from .env) file into process.env object
dotenv.config();

connectDB();
const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
console.log("Hello World");
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/theatres", theatreRoutes);
app.use("/api/shows", showRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
