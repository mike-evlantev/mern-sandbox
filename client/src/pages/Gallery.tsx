import React from "react";
import { CarouselContainer } from "../components/Carousel";
import { Outlet } from "react-router-dom";

export const Gallery: React.FC = () => {       
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
            <Outlet />          
        </>        
    );
}