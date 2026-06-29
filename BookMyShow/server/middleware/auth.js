import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
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
