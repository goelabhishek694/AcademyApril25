import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { makePayment, bookShow, getBookingByUser } from "../controller/booking.js";

const bookingRouter = express.Router();

bookingRouter.post("/make-payment", authMiddleware, makePayment );
bookingRouter.post("/book-show", authMiddleware, bookShow);
bookingRouter.get("/:userId", authMiddleware, getBookingByUser);

export default bookingRouter;