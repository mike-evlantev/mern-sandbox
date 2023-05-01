import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { add } from "../features/gallery/cartSlice";

export const Composition: React.FC = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {compositions} = useAppSelector(state => state.gallery);
    const composition = compositions.find(c => c.index.toString() === id);

    const handlePurchase = () => {
        dispatch(add(composition?.index!));
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
                        <p className="card-text">{composition.material}</p>
                        <p className="card-text">{composition.year}</p>
                        <p className="card-text">{composition.description}</p>
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