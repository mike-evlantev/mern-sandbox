import { NextFunction, Request, Response } from "express";

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  res
    .status(res.statusCode || 500)
    .json({ 
      success: false,
      message: error.message,
      stack: process.env.NODE_ENV === "production" ? null : error.stack
     });
}