import { useSearchParams } from 'react-router-dom';

export const Confirmation = () => {
    const [searchParams] = useSearchParams();
    const {payment_intent, payment_intent_client_secret, redirect_status} = Object.fromEntries(Array.from(searchParams));

    return(<>
        <>Confirmation</>
        <div className="d-flex flex-column">
            <div>Payment Intent: {payment_intent}</div>
            <div>Payment Intent Secret: {payment_intent_client_secret}</div>
            <div>Redirect Status: {redirect_status}</div>
        </div>
    </>);
}