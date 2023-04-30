import { Elements, LinkAuthenticationElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Layout } from "@stripe/stripe-js";
import React from "react";
import { stripeService } from "../features/stripe/stripeService";

export const Checkout: React.FC = () => {
    // const stripe = useStripe();
    // const elements = useElements();
    const [stripePromise, setStripePromise] = React.useState();
    const [clientSecret, setClientSecret] = React.useState();

    React.useEffect(() => {
        async function config() {
            const data = await stripeService.config();
            console.log('key', data);
        }
        config();
    }, []);

    React.useEffect(() => {}, []);

    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    
    const handleSubmit = () => {
        console.log('clicked handle submit');
    }

    const paymentElementOptions = {
        layout: 'tabs' as Layout
    }

    return(
        <Elements stripe={stripePromise || null} options={{clientSecret}}>
            <form id="payment-form" onSubmit={handleSubmit}>
                {/* <LinkAuthenticationElement
                    id="link-authentication-element"
                    onChange={(e) => setEmail(e.value.email)}
                /> */}
                {/* <PaymentElement id="payment-element" options={paymentElementOptions} /> */}
                <button disabled={isLoading} id="submit">
                    <span id="button-text">
                    {/* {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"} */}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
        </Elements>
    );
}