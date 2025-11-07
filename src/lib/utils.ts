import { env } from "../config/env.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import { response, Request } from "express";

export const extractTokenAndDecode = (req: Request): JwtPayload | null => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};
