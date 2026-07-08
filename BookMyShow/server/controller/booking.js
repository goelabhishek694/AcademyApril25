const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Booking = require("../models/booking.js");
const Show = require("../models/show.js");

export const makePayment = async (req, res) => {
    try{
        const {token, amount} = req.body;
        const cutomer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const paymentIntent = await stripe.paymentIntents.create({
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
