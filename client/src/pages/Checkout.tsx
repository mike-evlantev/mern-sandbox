import { Elements } from "@stripe/react-stripe-js";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import React from "react";
import { stripeService } from "../features/stripe/stripeService";
import { CheckoutForm } from "../components/CheckoutForm";
import { useAppSelector } from "../app/hooks";

export const Checkout: React.FC = () => {
    const {gallery: {compositions}, order: {items}} = useAppSelector(state => state);
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
            const amount = compositions.filter(c => items.some(id => id === c.index)).reduce((a, b) => a + b.price, 0);
            const clientSecret = await stripeService.createPaymentIntent(amount);
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