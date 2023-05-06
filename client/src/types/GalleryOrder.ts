import { StripeError } from "@stripe/stripe-js";
import { Guest } from "./Guest";

export interface GalleryOrder extends Guest {
    id: string; // generated and overwritten by mongoose
    createdAt: string; // generated and overwritten by mongoose
    items: number[];
    error: StripeError | undefined;
    paymentIntent: string;
    total: number;
}

