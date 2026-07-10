import User from "../models/user.js";
import bcrypt from "bcrypt";
import { signToken } from "../utility/jwt.js";
import emailHelper from "../utility/emailHelper.js";
import { otpGenerator } from "../utility/otpGenerator.js";

export const register = async (req, res) => {
  try {
    //destructure the values from the request body
    const { name, email, password, role = "user" } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    //check if user already exists
    const existingUser = await User.findOne({ email: email });
    //if it exists , throw error
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
      // if not , save data to db
    } else {
      const newuser = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
      });
      //return suceess response
      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: newuser,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    //destructure the values from the request body
    const { email, password } = req.body;
    //check if user already exists
    const user = await User.findOne({ email: email });
    //if it exists , throw error
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
      // if not , save data to db
    } else {
      const passwordMatches = await bcrypt.compare(password, user.password);
      if (passwordMatches) {
        const token = signToken({ userId: user._id.toString() });

        //return suceess response
        return res.status(200).json({
          success: true,
          message: "User loggedin successfully",
          data: { token },
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid credentials",
        });
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    // 1. get uer's email
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
    //2. check if user is registered
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    //3. generate basic otp
    const otp = otpGenerator();
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();
    //4. send otp via email
    await emailHelper("otp", user.email, { otp, name: user.name });
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: "failure",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    let resetDetails = req.body;
    let { email } = req.params;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (Date.now() > user.otpExpiry) {
      return res.status(401).json({
        success: false,
        message: "password expired",
      });
    }
    console.log(resetDetails.otp, user.otp);
    if (resetDetails.otp !== user.otp) {
      return res.status(401).json({
        success: false,
        message: "Invalid otp",
      });
    }

    user.password = await bcrypt.hash(resetDetails.password, 10);
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: "failure",
    });
  }
};
