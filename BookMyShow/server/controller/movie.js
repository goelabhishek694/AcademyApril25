import Movie from "../models/movie.js";

export const addMovie = async(req,res) => {
    try{
        const movie = await Movie.create(req.body);
        return res.send({
            success:true,
            message:"Movie created successfully",
            data:movie,
        })
    }catch(err){
        return res.send({
            success:false,
            message:err.message,
        })
    }
}

export const getAllMovies = async(req,res) => {
    try{
        const movies = await Movie.find().sort({createdAt:-1});
        return res.send({
            success:true,
            message:"Movie fetched successfully",
            data:movies,
        })
    }catch(err){
        return res.send({
            success:false,
            message:err.message,
        })
    }
}

export const updateMovie = async(req, res) => {
    try{
        await Movie.findByIdAndUpdate(req.params.id, req.body);
        return res.send({
            success:true,
            message:"Movie updated successfully",
        })
    }catch(err){
        return res.send({
            success:false,
            message:err.message,
        })
    }
}

export const deleteMovie = async(req, res) => {
    try{
        await Movie.findByIdAndDelete(req.params.id)
        return res.send({
            success:true,
            message:"Movie deleted successfully",
        })
    }catch(err){
        return res.send({
            success:false,
            message:err.message,
        })
    }
}

export const getMovieById = async(req, res) => {
    try{
        const {id} = req.params;
        if(!id){
            return res.send({
                success:false,
                message:"Movie ID is required",
            })
        }
        const movie = await Movie.findById(id);
        return res.send({
            success:true,
            message:"Movie fetched successfully",
            data:movie,
        })
    }catch(err){
        return res.send({
            success:false,
            message:err.message,
        })
    }
}