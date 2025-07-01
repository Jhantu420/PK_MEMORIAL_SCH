import jwt from "jsonwebtoken";
import "dotenv/config";
const secret = process.env.JWT_SECRET;
const options = {
  expiresIn: "30 days",
};

const generateToken = (id) => {
  const payload = {
    id: id,
  };
  const token = jwt.sign(payload,secret,options);
  return token;
};

export { generateToken };
