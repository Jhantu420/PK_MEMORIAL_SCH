import jwt from "jsonwebtoken";
import "dotenv/config";
const secret = process.env.JWT_SECRET;
const options = {
  expiresIn: "30 days",
};

const generateToken = (id,role) => {
  const payload = {
    id: id,
    role:role
  };
  const token = jwt.sign(payload,secret,options);
  return token;
};

export { generateToken };
