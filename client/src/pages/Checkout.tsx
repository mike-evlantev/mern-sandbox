import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Layout } from "@stripe/stripe-js";
import React from "react";

export const Checkout: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();

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
        <>
            <form id="payment-form" onSubmit={handleSubmit}>
                {/* <LinkAuthenticationElement
                    id="link-authentication-element"
                    onChange={(e) => setEmail(e.value.email)}
                /> */}
                <PaymentElement id="payment-element" options={paymentElementOptions} />
                <button disabled={isLoading || !stripe || !elements} id="submit">
                    <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
        </>
    );
}