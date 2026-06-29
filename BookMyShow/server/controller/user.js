import User from "../models/user.js";
import bcrypt from "bcrypt";
import { signToken } from "../utility/jwt.js";

export const register = async (req, res) => {
    try{
        //destructure the values from the request body
        const { name, email, password, role="user" } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
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
            const newuser = await User.create({name, email, password: hashedPassword, role});
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

export const login = async (req, res) => {
    try{
        //destructure the values from the request body
        const { email, password } = req.body;
        //check if user already exists 
        const user = await User.findOne({email:email});
        //if it exists , throw error 
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        // if not , save data to db
        }else{
            const passwordMatches = await bcrypt.compare(password, user.password);
            if(passwordMatches){
                const token = signToken({ userId: user._id.toString() });
                //return suceess response
                return res.status(200).json({
                    success: true,
                    message: "User loggedin successfully",
                    data: {token},
                });
            }
            else{
                return res.status(400).json({
                    success: false,
                    message: "Invalid credentials",
                });
            }
        }
    }catch(err){
        console.error(err.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}