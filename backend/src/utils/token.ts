
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const generateToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "2d" });
};
