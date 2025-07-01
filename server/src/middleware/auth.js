import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET; // Ensure this is loaded correctly from .env

const verifyUser = (req, res, next) => {
    try {
        const token = req.cookies.token; // Get token from cookies

        if (!token) {
            // Explicitly handle no token provided *before* jwt.verify
            // This is cleaner than letting jwt.verify throw "jwt must be provided"
            return res.status(401).json({ // 401 Unauthorized
                success: false,
                message: "Authentication failed: No token provided.",
                errorCode: "NO_TOKEN"
            });
        }

        const decodeToken = jwt.verify(token, secret);
        req.user = decodeToken; // Attach decoded user payload to request
        next(); // Proceed to the next middleware/route handler

    } catch (error) {
        console.error("Authentication middleware error:", error); // Use console.error for errors

        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ // 401 Unauthorized is appropriate
                success: false,
                message: "Token Expired. Please log in again.",
                errorCode: "TOKEN_EXPIRED"
            });
        } else if (error instanceof jwt.JsonWebTokenError) {
            // This now catches "jwt must be provided", "invalid signature", "invalid token", etc.
            return res.status(401).json({ // 401 Unauthorized for general JWT errors
                success: false,
                message: "Invalid token. Please log in again.",
                errorCode: "INVALID_TOKEN",
                // You can include more details for debugging if needed, e.g.:
                // debugMessage: error.message
            });
        } else {
            // Catch any other unexpected errors during token verification (e.g., non-JWT related)
            return res.status(500).json({
                success: false,
                message: "Authentication failed due to an unexpected server error.",
                errorCode: "SERVER_ERROR"
            });
        }
    }
};

export { verifyUser };