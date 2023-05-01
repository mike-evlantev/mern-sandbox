import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Layout } from "@stripe/stripe-js";
import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { reset } from "../features/gallery/cartSlice";


export const CheckoutForm = () => {
    const dispatch = useAppDispatch();
    const { gallery: {compositions}, cart: {items} } = useAppSelector(state => state);
    const stripe = useStripe();
    const elements = useElements();
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState('test message');
    const [isLoading, setIsLoading] = React.useState(false);
    
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/gallery/confirmation`,
            },
        });
    
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message || '');
        } else {
            setMessage("An unexpected error occured.");
            console.error('An unexpected error occured.', error);
        }
    
        setIsLoading(false);
        dispatch(reset());
    }

    const paymentElementOptions = {
        layout: 'tabs' as Layout
    }

    const stripeInputStyle = {lineHeight: 1.8, borderColor: '#e6e6e6', boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(0, 0, 0, 0.02)'};

    return(
        <div className="d-flex align-items-start">
            <div className="d-flex flex-column mx-1">
                <h5>You are ordering</h5>
                {compositions.filter(c => items.includes(c.index)).map(c => 
                    <div key={c.index} className="card border-0 mb-3">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={c.src} className="img-fluid rounded-start" width="250" alt={c.alt} />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body d-flex flex-column h-100">
                                    <h5 className="card-title">{c.title}</h5>
                                    <p className="card-text">{c.material}</p>
                                    <p className="card-text"><small className="text-muted">{`${c.width} x ${c.height} inches`}</small></p>
                                    <p className="card-text mt-auto ms-auto">{c.price}</p>
                                </div>
                            </div>
                        </div>
                    </div>)}
            </div>
            <div className="d-flex flex-column justify-content-center ms-auto mx-1">
                <div className="d-flex">
                    <div>
                        <label>First name</label>
                        <input type="text" className="form-control" style={stripeInputStyle} />
                    </div>
                    <div>
                        <span className="mb-1">Last name</span>
                        <input type="text" className="form-control" style={stripeInputStyle} />
                    </div>
                </div>
                <div className="d-flex">
                    <div>
                        <label className="form-label">Email</label>
                        <input type="text" className="form-control" />
                    </div>
                </div>
                <div className="d-flex">
                    <div>
                        <label className="form-label">Shipping Address</label>
                        <input type="text" className="form-control" />
                    </div>
                </div>
                <div className="d-flex">
                    <div>
                        <label className="form-label">Shipping Address 2</label>
                        <input type="text" className="form-control" />
                    </div>
                </div>
                <div className="d-flex">
                    <div>
                        <label className="form-label">City</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div>
                        <label className="form-label">State</label>
                        <input type="text" className="form-control" />
                    </div>
                </div>
                <div className="d-flex">
                    <div>
                        <label className="form-label">ZIP</label>
                        <input type="text" className="form-control" />
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column justify-content-center ms-auto mx-1">
                <PaymentElement id="payment-element" options={paymentElementOptions} />
                <button className="btn btn-outline-dark border-0 rounded-0 mt-2" type="submit" disabled={isLoading || !stripe || !elements} id="submit">
                    <span id="button-text">
                        {isLoading ? "Processing ... " : "Pay now"}                                                                                                                                            {/* {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"} */}
                    </span>
                </button>
                {message && <div id="payment-message">{message}</div>}
            </div>
        </div>
        
        // <form id="payment-form" onSubmit={handleSubmit}>
        //     {/* <LinkAuthenticationElement
        //         id="link-authentication-element"
        //         onChange={(e) => setEmail(e.value.email)}
        //     /> */}
        //     <PaymentElement id="payment-element" options={paymentElementOptions} />
        //     <button className="btn btn-outline-dark border-0 rounded-0 ms-auto" type="submit" disabled={isLoading || !stripe || !elements} id="submit">
        //         <span id="button-text">
        //             {isLoading ? "Processing ... " : "Pay now"}                                                                                                                                            {/* {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"} */}
        //         </span>
        //     </button>
        //     {/* Show any error or success messages */}
        //     {message && <div id="payment-message">{message}</div>}
        // </form>
    );
}