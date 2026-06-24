import User from "../models/user.js";

export const register = async (req, res) => {
    try{
        //destructure the values from the request body
        const { name, email, password, role="user" } = req.body;

        //check if user already exists 
        const existingUser = await User.findOne({email:email});
        //if it exists , throw error 
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        // if not , save data to db
        }else{
            const newuser = await User.create({name, email, password, role});
            //return suceess response
            return res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: newuser,
            });
        }
    }catch(err){
        console.error(err.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}