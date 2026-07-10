import stripe from "stripe";
const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY);
import Booking from "../models/booking.js";
import Show from "../models/show.js";
import emailHelper from "../utility/emailHelper.js";

export const makePayment = async (req, res) => {
    try{
        const {token, amount} = req.body;
        const cutomer = await stripeClient.customers.create({
            email: token.email,
            source: token.id
        });

        const paymentIntent = await stripeClient.paymentIntents.create({
            amount,
            currency: "usd",
            customer: customer.id,
            payment_method_types: ["card"],
            receipt_email: token.email,
            description: "Token has been assigned to movie",
            confirm: true,
        });

        const transactionId = paymentIntent.id;
        res.send({
            success: true,
            message: "Payment processing, you will receive a confirmation once the payment is done",
            data: transactionId
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}


export const bookShow = async (req, res) => {
    try{
        const newBooking = new Booking(req.body);
        await newBooking.save();

        const show = await Show.findById(req.body.show).populate("movie");
        const updatedBookedSeats = [...show.bookedSeats, ...req.body.seats];
        await Show.findByIdAndUpdate(req.body.show, {bookedSeats: updatedBookedSeats});
        const populatedBooking = await Booking.findById(newBooking._id).populate("user")
        .populate("show")
        .populate({
            path:"show",
            popultate: {
                path:"movie",
                model:"Movie"
            }
        })
        .populate({
            path:"show",
            popultate: {
                path:"theatre",
                model:"Theatre"
            }
        });

        console.log(populatedBooking);




        // const bookingData = {
        //     movie: show.movie.title,
        //     name: 
        //     theatre:
        //     date:
        //     time: 
        //     seats:
        //     amount: 
        //     transactionId:
        // }
        // await emailHelper("tickets", email of person , )
        res.send({
            success: true,
            message: "Show booked successfully",
            data: newBooking
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

export const getBookingByUser = async (req, res) => {
    try{
        const bookings = await Booking.find({user: req.userId})
        .populate("user")
        .populate("show")
        .populate({
            path: show,
            popultate: {
                path: movie,
                model: Movie
            }
        })
        .populate({
            path: show,
            popultate: {
                path: theatre,
                model: Theatre
            }
        });


        res.send({
            success: true,
            message: "Bookings fetched successfully",
            data: bookings
        })
    }catch(err){
        res.status(500).json({
            success: false,
        })
    }
}
