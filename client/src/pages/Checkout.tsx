import { Elements } from "@stripe/react-stripe-js";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import React from "react";
import { stripeService } from "../features/stripe/stripeService";
import { CheckoutForm } from "../components/CheckoutForm";

export const Checkout: React.FC = () => {
    const [stripePromise, setStripePromise] = React.useState<Promise<Stripe | null>>();
    const [clientSecret, setClientSecret] = React.useState();

    React.useEffect(() => {
        async function config() {
            const { publishableKey } = await stripeService.config();
            setStripePromise(loadStripe(publishableKey));
        }
        config();
    }, []);

    React.useEffect(() => {
        async function intent() {            
            const clientSecret = await stripeService.createPaymentIntent();
            setClientSecret(clientSecret);
        }
        intent();
    }, []);    

    return(<>
        {clientSecret && 
            <Elements stripe={stripePromise || null} options={{clientSecret}}>
                <CheckoutForm />
            </Elements>}
    </>);
}