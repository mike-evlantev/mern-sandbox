import React from "react";
import { CarouselContainer } from "../components/Carousel";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export const Gallery: React.FC = () => {
    const {compositions} = useAppSelector(state => state.gallery);
         
    return (
        <>
            <div style={{position: 'absolute', zIndex: 10, left: '50%', transform: 'translate(-50%)'}}>
                <div className="d-flex justify-content-center m-2">
                    <p className="lead">
                        Alyssa Breid
                    </p>
                </div>
            </div>
            <div style={{position: 'relative'}}>
                <CarouselContainer />
            </div>
            <div className="row">
                {compositions?.length > 0 
                    ? compositions.map(({index, src, alt, title, material, price}) => (
                        <div className="col col-sm-12 col-md-6 col-lg-4 col-xl-3" key={index}>
                            <div className="card">
                                <img src={src} className="card-img-top" alt={alt} />
                                <div className="card-body">
                                    <h5 className="card-title">{title}</h5>
                                    <p className="card-text">{material}</p>
                                    <span>{price}</span>
                                </div>
                            </div>
                        </div>
                    )) 
                    : <span>No products found</span>}
            </div>
            
            <Outlet />          
        </>        
    );
}