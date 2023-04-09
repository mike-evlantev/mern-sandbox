import React from "react";

export const Gallery: React.FC = () => {
    const [index, setIndex] = React.useState(1);

    const items = [
        {

        }
    ];

    const handlePrevious = () => {
        if(index === 1) {
            setIndex(3);
            return;
        }

        setIndex(prev => prev - 1);
    }

    const handleNext = () => {
        if(index === 3) {
            setIndex(1);
            return;
        }

        setIndex(prev => prev + 1);
    }

    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className={index === 1 ? 'active' : ''} aria-current={index === 1} aria-label="Slide 1" onClick={() => setIndex(1)}></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" className={index === 2 ? 'active' : ''} aria-current={index === 2} aria-label="Slide 2" onClick={() => setIndex(2)}></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" className={index === 3 ? 'active' : ''} aria-current={index === 3} aria-label="Slide 3" onClick={() => setIndex(3)}></button>
            </div>
            <div className="carousel-inner">
                <div className={`carousel-item ${index === 1 ? 'active' : ''}`}>
                    <img src="https://cdn.shopify.com/s/files/1/0941/7736/products/La-Ligne-Natural_21_25x21_25.jpg?v=1669842516" className="d-block w-100" alt="Slide 1" />
                </div>
                <div className={`carousel-item ${index === 2 ? 'active' : ''}`}>
                    <img src="https://cdn.shopify.com/s/files/1/0941/7736/products/La-Ligne-Brut-Noir_21_25x21_25-Primary.jpg?v=1669841607" className="d-block w-100" alt="Slide 2" />
                </div>
                <div className={`carousel-item ${index === 3 ? 'active' : ''}`}>
                    <img src="https://cdn.shopify.com/s/files/1/0941/7736/products/Untitled-_totem_-cream__18x24-Primary.jpg?v=1640031270" className="d-block w-100" alt="Slide 3" />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev" onClick={handlePrevious}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next" onClick={handleNext}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}