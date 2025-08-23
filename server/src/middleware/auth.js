import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

const verifyUser = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed: No token provided.",
        errorCode: "NO_TOKEN",
      });
    }

    const decodeToken = jwt.verify(token, secret);
    req.user = decodeToken;
    next();
  } catch (error) {
    console.error("Authentication middleware error:", error);

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: "Token Expired. Please log in again.",
        errorCode: "TOKEN_EXPIRED",
      });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Please log in again.",
        errorCode: "INVALID_TOKEN",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Authentication failed due to an unexpected server error.",
        errorCode: "SERVER_ERROR",
      });
    }
  }
};

export { verifyUser };
