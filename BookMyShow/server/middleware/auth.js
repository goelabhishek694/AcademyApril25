import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const authMiddleware = async (req, res, next) => {
  try {
    //verify the token
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header is missing",
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format",
      });
    }

    const clientToken = authHeader.split(" ")[1];

    if (!clientToken) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    const secret = process.env.JWT_SECRET;
    //create a new token in BE using payload, header from clientToken and secret_key form env. the compare it with each other. if matches then retunr payload
    const payload = jwt.verify(clientToken, secret);
    req.userId = payload.userId;
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

export const adminMiddleware = async(req,res,next) => {
  try{
    const user = await User.findById(req.userId).select("role");
    if(!user || user.role !== "admin"){
      return res.status(403).json({
        success: false,
        message: "Unauthorized access"
      })
    }
    next();
  }catch(err){
    console.error(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message
    })
  }
}
