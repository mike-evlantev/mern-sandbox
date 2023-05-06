import { useAppSelector } from '../app/hooks';

export const Confirmation = () => {
    //const [searchParams] = useSearchParams();
    //const {payment_intent, payment_intent_client_secret, redirect_status} = Object.fromEntries(Array.from(searchParams));
    const { order } = useAppSelector(state => state);

    return(<>
        <>Thank you for you order, {order.first}</>
        <div className="d-flex flex-column">
            {/* <div>Payment Intent: {payment_intent}</div>
            <div>Payment Intent Secret: {payment_intent_client_secret}</div>
            <div>Redirect Status: {redirect_status}</div> */}
            <div>Confirmation number: {order.id}</div>
        </div>
    </>);
}