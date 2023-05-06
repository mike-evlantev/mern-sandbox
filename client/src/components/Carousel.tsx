import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export interface CarouselItem {
    index: number;
    title: string;
    description: string;
    material: string;
    src: string;
    alt: string;
    price: number;
    width: number;
    height: number;
    year: number;
}

export const CarouselContainer = () => {
    const [index, setIndex] = React.useState(0);
    const {compositions} = useAppSelector(state => state.gallery);

    return(<>
        <Carousel compositions={compositions} index={index} setIndex={setIndex} />
        <div className="d-flex mt-2">
            <h5>{compositions[index].title}</h5>
            <Link to={`/gallery/${index}`} className="nav-link ms-auto">Get this in 4 - 6 weeks</Link>
        </div>
        <div className="row mt-5">
            {compositions?.length > 0 
                ? compositions.map(({index, src, alt, title, material, price}) => (
                    <div className="col col-sm-12 col-md-6 col-lg-4 col-xl-3" key={index}>
                        <Link to={`/gallery/${index}`} className="nav-link ms-auto">
                            <div className="card">
                                <img src={src} className="card-img-top" alt={alt} />
                                <div className="card-body">
                                    <h5 className="card-title">{title}</h5>
                                    <p className="card-text">{material}</p>
                                    <span>{price}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                )) 
                : <span>No products found</span>}
        </div>
    </>);
}

export const Carousel: React.FC<{compositions: CarouselItem[], index: number, setIndex: React.Dispatch<React.SetStateAction<number>> }> = ({compositions, index, setIndex}) => {
    const carouselId = 'carouselExampleIndicators';

    const handlePrevious = () => {
        if(index === 0) {
            setIndex(compositions.length - 1);
            return;
        }

        setIndex(prev => prev - 1);
    }

    const handleNext = () => {
        if(index === compositions.length - 1) {
            setIndex(0);
            return;
        }

        setIndex(prev => prev + 1);
    }

    const getClassName = React.useCallback((itemIndex: number): string => {
        return index === itemIndex ? 'active' : '';
    }, [index]); 

    return(
        <div id={carouselId} className="carousel carousel-dark slide bg-light" data-bs-ride="carousel">
            <div className="carousel-indicators">
                {compositions.map(i =>
                    <button
                        key={`carousel-indicator-${i.index}`}
                        type="button" 
                        data-bs-target={`#${carouselId}`} 
                        data-bs-slide-to={i.index} 
                        className={getClassName(i.index)} 
                        aria-current={index === i.index} 
                        aria-label={i.alt} 
                        onClick={() => setIndex(i.index)}>
                    </button>
                )}
            </div>
            <div className="carousel-inner">
                {compositions.map(i =>
                    <div key={`carousel-item-${i.index}`} className={`carousel-item mt-5 ${getClassName(i.index)}`}>
                        <img className="d-block w-50 ms-auto me-auto" src={i.src} alt={i.alt} />
                        {/* <div className="carousel-caption d-none d-md-block">
                            <h5>{i.title}</h5>
                            <Link to={`/gallery/${i.index}`} className="nav-link">Get this in 4 - 6 weeks</Link>
                        </div> */}
                    </div>                    
                )}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev" onClick={handlePrevious}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next" onClick={handleNext}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}