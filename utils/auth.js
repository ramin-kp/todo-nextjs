const { hash, compare } = require("bcryptjs");
import { sign, verify } from "jsonwebtoken";

const hashPassword = async (password) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};

const generateToken = (data) => {
  const generatedToken = sign({ ...data }, process.env.privetKey, {
    expiresIn: "24h",
  });
  return generatedToken;
};

const verifyToken = (token) => {
  try {
    const verifiedToken = verify(token, process.env.privetKey);

    return verifiedToken;
  } catch (error) {
    return false;
  }
};
const comparePassword = async (password, hashPassword) => {
  const comparedPassword = await compare(password, hashPassword);
  return comparedPassword;
};
export { hashPassword, generateToken, verifyToken, comparePassword };
