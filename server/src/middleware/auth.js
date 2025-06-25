import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;
const verifyUser = (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decodeToken = jwt.verify(token, secret);
    req.user = decodeToken;
    // console.log("token from middleware",decodeToken)
    next();
  } catch (error) {
    console.log(error);
    if(error instanceof jwt.TokenExpiredError){
        return res.status(400).json({success:false, message:"Token Expired..!! login again"});
    }
  }
};
export { verifyUser };
