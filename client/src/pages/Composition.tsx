import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export const Composition: React.FC = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {compositions} = useAppSelector(state => state.gallery);
    const composition = compositions.find(c => c.index.toString() === id);

    const handlePurchase = () => {
        navigate('/gallery/checkout');
    }

    if (!composition) {
        return <>Composition not found</>
    }

    return(
        <>
            <div className="card mb-3 border-0">
                <div className="d-flex g-0">
                    <img src={composition.src} alt={composition.alt} className="w-50" />
                    <div className="d-flex flex-column card-body">
                        <h5 className="card-title">{composition.title}</h5>
                        <p className="card-text">This is a textile composition made with locally sourced sustainable materials.</p>
                        <div className="d-flex mt-auto">
                            <>{composition.price} USD</>
                            <button type="button" className="btn btn-outline-dark border-0 rounded-0 ms-auto" onClick={handlePurchase}>Get it in 4-6 weeks</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}