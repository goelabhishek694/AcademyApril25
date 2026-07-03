import Theatre from "../models/theatre.js";

export const addTheatre = async (req, res) => {
    try{
        const theatre = await Theatre.create({
            ...req.body,
            owner: req.userId,
            isActive: false
        });

        return res.send({
            success: true,
            message: "Theatre added successfully",
            data: theatre
        })
    }catch(err){
        console.error(err.message);
        return res.status(500).send({
            success: false,
            message: "Internal server error",
            error: err.message
        })
    }
}

export const getMyTheatres = async (req, res) => {
    try{
        const theatres = await Theatre.find({owner: req.userId}).sort({createdAt: -1});

        return res.send({
            success: true,
            message: "Theatre retrieved successfully",
            data: theatres
        })
    }catch(err){
        console.error(err.message);
        return res.status(500).send({
            success: false,
            message: "Internal server error",
            error: err.message
        })
    }
}

export const getAllTheatres = async (req, res) => {
    try{
        const allTheatres = await Theatre.find().populate("owner", "name email").sort({createdAt: -1});
        return res.send({
            success: true,
            message: "All theatres retrieved successfully",
            data: allTheatres
        });
        
    }catch(err){
        console.error(err.message);
        return res.status(500).send({
            success: false,
            message: "Internal server error",
            error: err.message
        })
    }
}