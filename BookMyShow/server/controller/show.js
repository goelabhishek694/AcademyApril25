import Show from "../models/show.js";

export const addShow = async (req, res) => {
    try {
        const {movie, theatre, date, time, ticketPrice} = req.body;
        const show = await Show.create({movie, theatre, date, time, ticketPrice});
        return res.status(201).json({
            success: true,
            message: "Show created successfully",
            data:show
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

export const getShowsByMovieAndDate = async (req, res) => {
    try {
        const {movieId, date} = req.query;
        const shows = await Show.find({movie: movieId, date}).populate("theatre").sort({time:1});

        return res.status(200).json({
            success: true,
            message: "Shows fetched successfully",
            data:shows
        })
    } catch (error) {
        console.error(error.message);
            return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message || "Something went wrong"
        })
    }
}

export const getShowsByTheatre = async (req, res) => {
    try {
        const {theatreId} = req.query;
        const shows = await Show.find({theatre: theatreId}).populate("movie").sort({date: 1, time:1});

        return res.status(200).json({
            success: true,
            message: "Shows fetched successfully",
            data:shows
        })
    } catch (error) {
        console.error(error.message);
            return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message || "Something went wrong"
        })
    }
}