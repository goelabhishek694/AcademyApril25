import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true,
        trim: true,
    },
    poster: {
        type:String,
        required: true,
        trim: true,
    },
    description: {
        type:String,
        required: true,
        trim: true,
    },
    duration: {
        type:String,
        required: true,
        trim: true,
    },
    genre: {
        type:String,
        required: true,
        trim: true,
    },
    language: { 
        type: String, 
        required: true, 
        trim: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
}, {timestamps: true});

const Movie = mongoose.model("movies", movieSchema);

export default Movie;