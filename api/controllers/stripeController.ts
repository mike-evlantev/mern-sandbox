import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Stripe from "stripe";


// @desc Get Stripe publishable key
// @route GET /api/payments/config
// @access PRIVATE
export const config = (req: Request, res: Response) => {
    res.status(200).json({publishableKey: process.env.STRIPE_PUBLISHABLE_KEY as string});
};

// @route       POST api/payment
// @desc        Process a payment
// @access      Public
export const createPaymentIntent = asyncHandler(async (req: Request, res: Response) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {apiVersion: "2022-11-15"});
    const { amount } = req.body;
    const cents = toCents(amount);
    const result = await stripe.paymentIntents.create({
      amount: cents, // in cents
      currency: "usd",
      description: "Gallery Composition Order",
      payment_method_types: ["card"],
    });
  
    res.status(200).send(result.client_secret);
});

const toCents = (amount: number) => {
    const cents = amount * 100;
    return Math.floor(cents);
};