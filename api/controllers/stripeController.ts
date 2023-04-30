import asyncHandler from "express-async-handler";
import { Request, Response } from "express";


// @desc Get Stripe publishable key
// @route GET /api/payments/config
// @access PRIVATE
export const config = (req: Request, res: Response) => {
    res.status(200).json({punblishableKey: process.env.STRIPE_PUBLISHABLE_KEY});
};