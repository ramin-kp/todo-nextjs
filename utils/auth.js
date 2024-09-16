const { hash } = require("bcryptjs");
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
  const verifiedToken = verify(token, process.env.privetKey);

  return verifiedToken;
};

export { hashPassword, generateToken, verifyToken };
