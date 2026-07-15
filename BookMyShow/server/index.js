import express from "express";
//that this line will load all the environment variables (from .env) file into process.env object
import dotenv from "dotenv/config";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";

import connectDB from "./config/db.js";
import userRoutes from "./routes/user.js";
import movieRoutes from "./routes/movie.js";
import theatreRoutes from "./routes/theatre.js";
import showRoutes from "./routes/show.js";
import bookingRoutes from "./routes/booking.js";


const apiLimiter = rateLimit({
  windowMs: 15*60*1000, //15 minutes
  max: 100, //limit each IP to 100 requesrs after 15min
  message: "Too many requests from this IP. please try again after 15 minutes"
})
connectDB();
const app = express();
app.use(helmet());
app.use(mongoSanitize());
// app.use(helmet.contentSecurityPolicy({
//   directives: {
//     defaultSrc: ["'self'"],
//     scriptSrc: ["'self'"],
//     styleSrc: ["'self'", "'unsafe-inline'"],
//     imgSrc: ["'self'", "data:", "https://*.google.com"],
//     fontSrc: ["'self'", "https://fonts.gstatic.com"],
//     connectSrc: ["'self'", "https://*.google.com"],
//     frameSrc: ["'self'", "https://*.google.com"],
//   }
// }))
app.disable("x-powered-by"); // it will remove the x-powered-by header from the response
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

//apply rate limiter to all the routes 
app.use("/api", apiLimiter)
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
