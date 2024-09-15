const { hash } = require("bcryptjs");
import { sign } from "jsonwebtoken";

const hashPassword = async (password) => {
  const hashedPassword =await hash(password, 12);
  return hashedPassword;
};

const generateToken = (data) => {
  const generatedToken = sign({ ...data }, process.env.privetKey, {
    expiresIn: "24h",
  });
  return generatedToken;
};

export { hashPassword, generateToken };
