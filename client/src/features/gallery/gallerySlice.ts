import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CarouselItem } from '../../components/Carousel';

interface GalleryState {
    compositions: CarouselItem[];
}

const compositions: CarouselItem[] = [
    {
        index: 0,
        title: 'La Ligne Natural',
        src: 'https://cdn.shopify.com/s/files/1/0941/7736/products/La-Ligne-Natural_21_25x21_25.jpg?v=1669842516',
        alt: 'La-Ligne-Natural',
        price: 3000
    },
    {
        index: 1,
        title: 'La Ligne Brut Noir',
        src: 'https://cdn.shopify.com/s/files/1/0941/7736/products/La-Ligne-Brut-Noir_21_25x21_25-Primary.jpg?v=1669841607',
        alt: 'La-Ligne-Brut-Noir',
        price: 4000
    },
    {
        index: 2,
        title: 'Untitled',
        src: 'https://cdn.shopify.com/s/files/1/0941/7736/products/Untitled-_totem_-cream__18x24-Primary.jpg?v=1640031270',
        alt: 'Untitled-_totem_-cream',
        price: 5000
    }
];

const initialState: GalleryState = {
    compositions
}

export const gallerySlice = createSlice({
    name: 'gallery',
    initialState,
    reducers: {}
});

export default gallerySlice.reducer;