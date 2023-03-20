import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utils/auth";

export interface AuthorizedRequest extends Request {
  token: JwtPayload;
}

export const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token: string;
  if (req.headers["x-auth-token"]) {
    token = req.headers["x-auth-token"] as string;
  } else {
    res.status(401);
    throw new Error("Not authorized to access route");
  }

  try {
    const decoded = verifyToken(token) as JwtPayload;
    
    if (decoded) {
      (req as AuthorizedRequest).token = decoded;
      next();
    } else {
      throw new Error("Not authorized to access route");
    }    
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error("Not authorized to access route");
  }
});