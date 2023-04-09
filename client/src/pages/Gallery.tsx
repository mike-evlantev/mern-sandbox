import React from "react";
import { Carousel, CarouselItem } from "../components/Carousel";

export const Gallery: React.FC = () => {   

    const items: CarouselItem[] = [
        {
            index: 0,
            src: 'https://cdn.shopify.com/s/files/1/0941/7736/products/La-Ligne-Natural_21_25x21_25.jpg?v=1669842516',
            alt: 'La-Ligne-Natural'
        },
        {
            index: 1,
            src: 'https://cdn.shopify.com/s/files/1/0941/7736/products/La-Ligne-Brut-Noir_21_25x21_25-Primary.jpg?v=1669841607',
            alt: 'La-Ligne-Brut-Noir'
        },
        {
            index: 2,
            src: 'https://cdn.shopify.com/s/files/1/0941/7736/products/Untitled-_totem_-cream__18x24-Primary.jpg?v=1640031270',
            alt: 'Untitled-_totem_-cream'
        }
    ];
    
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
                <Carousel items={items} />
            </div>            
        </>        
    );
}