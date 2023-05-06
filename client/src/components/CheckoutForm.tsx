import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Layout } from "@stripe/stripe-js";
import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addOrder, reset, update } from "../features/gallery/orderSlice";
import { Spinner } from "./Spinner";
import { useNavigate } from "react-router-dom";

enum Step {Shipping = 1, Payment = 2};

export const CheckoutForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { gallery: {compositions}, order } = useAppSelector(state => state);
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [step, setStep] = React.useState(Step.Shipping);
    const {first, last, email, phone, address1, address2, city, state, zip, items} = order;

    const handleStepChange = (step: Step) => {
        setStep(step);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const {name, value} = e.target;
        dispatch(update({[name]: value}));
    }    
    
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const { paymentIntent, error } = await stripe.confirmPayment({
            elements,
            // confirmParams: {
            //     return_url: `${window.location.origin}/gallery/confirmation`,
            // },
            redirect: 'if_required'
        });

        setIsLoading(true);

        if (error) {
            dispatch(update({error}));
            if (error?.type === "card_error" || error?.type === "validation_error") {
                setMessage(error?.message || '');
                console.error('An error occured.', error);
            } else {
                setMessage("An unexpected error occured.");
                console.error('An unexpected error occured.', error);
            }
        }

        dispatch(addOrder({...order, paymentIntent: paymentIntent?.id, error}));
        setIsLoading(false);
        //console.log('redirect order...', order);
        navigate('/gallery/confirmation?id=' + order.id);
        //dispatch(reset());
    }

    const paymentElementOptions = {
        layout: 'tabs' as Layout
    }

    const stepRenderer = (step: Step) => {
        switch (step) {
            case Step.Payment:                
                return(
                    <>
                        <h5 className="mb-3">Payment Details</h5>
                        <PaymentElement id="payment-element" options={paymentElementOptions} />
                        {message && <div id="payment-message" className="my-2">{message}</div>}
                        <div className="d-flex mt-2">
                            <button className="btn btn-outline-dark border-0 rounded-0 mt-2" onClick={() => handleStepChange(Step.Shipping)}>Back</button>
                            <button className="btn btn-outline-dark border-0 rounded-0 mt-2 ms-auto" onClick={handleSubmit} disabled={isLoading || !stripe || !elements} id="submit">
                                <span id="button-text">
                                    {isLoading ? "Processing ... " : "Pay now"}                                                                                                                                            {/* {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"} */}
                                </span>
                            </button>
                        </div>
                    </>
                );
            case Step.Shipping:
            default:
                return(<>
                    <h5 className="mb-3">Your Details</h5>
                    <div className="d-flex mb-2">
                        <div className="w-50 me-2">
                            <label>First name</label>
                            <input type="text" name="first" className="form-control" placeholder="First name" onChange={handleChange} value={first} style={stripeInputStyle} />
                        </div>
                        <div className="w-50">
                            <span className="mb-1">Last name</span>
                            <input type="text" name="last" className="form-control" placeholder="Last Name" onChange={handleChange} value={last} style={stripeInputStyle} />
                        </div>
                    </div>
                    <div className="d-flex mb-2">
                        <div className="w-100">
                            <label className="form-label">Email</label>
                            <input type="text" name="email" className="form-control" placeholder="Email" onChange={handleChange} value={email} style={stripeInputStyle} />
                        </div>
                    </div>
                    <div className="d-flex mb-2">
                        <div className="w-100">
                            <label className="form-label">Phone</label>
                            <input type="text" name="phone" className="form-control" placeholder="Phone" onChange={handleChange} value={phone} style={stripeInputStyle} />
                        </div>
                    </div>
                    <h5 className="mt-4 mb-3">Shipping Address</h5>
                    <div className="d-flex mb-2">
                        <div className="w-100">
                            <label className="form-label">Address</label>
                            <input type="text" name="address1" className="form-control" placeholder="Address Line 1" onChange={handleChange} value={address1} style={stripeInputStyle} />
                        </div>
                    </div>
                    <div className="d-flex mb-2">
                        <div className="w-100">
                            <label className="form-label">Address 2</label>
                            <input type="text" name="address2" className="form-control" placeholder="Address Line 2" onChange={handleChange} value={address2} style={stripeInputStyle} />
                        </div>
                    </div>
                    <div className="d-flex mb-2">
                        <div className="w-50 me-2">
                            <label className="form-label">City</label>
                            <input type="text" name="city" className="form-control" placeholder="City" onChange={handleChange} value={city} style={stripeInputStyle} />
                        </div>
                        <div className="me-2">
                            <label className="form-label">State</label>
                            <input type="text" name="state" className="form-control" placeholder="State" onChange={handleChange} value={state} style={stripeInputStyle} />
                        </div>
                        <div>
                            <label className="form-label">ZIP</label>
                            <input type="text" name="zip" className="form-control" placeholder="ZIP Code" onChange={handleChange} value={zip} style={stripeInputStyle} />
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <button className="btn btn-outline-dark border-0 rounded-0 mt-2 ms-auto" onClick={() => handleStepChange(Step.Payment)}>Next</button>
                    </div>
                </>);
        }
    }

    const stripeInputStyle = {lineHeight: 1.8, borderColor: '#e6e6e6', boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(0, 0, 0, 0.02)'};

    return(isLoading ? <Spinner /> :
        <div className="d-flex align-items-start">
            <div className="d-flex flex-column w-50 mx-5">
                {stepRenderer(step)}
            </div>
            <div className="d-flex flex-column w-50 mx-5">
                <div className="d-flex">
                    <h5>{items.length} {items.length > 1 ? 'items' : 'item'}</h5>
                    <h5 className="ms-auto">Total ${compositions.filter(c => items.some(id => id === c.index)).reduce((a, b) => a + b.price, 0)}.00</h5>
                </div>
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
                                    <div className="d-flex mt-auto">
                                        <small className="card-text text-muted">{`${c.width} x ${c.height} inches`}</small>
                                        <span className="card-text mt-auto ms-auto">${c.price}.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)}
            </div>
        </div>
    );
}