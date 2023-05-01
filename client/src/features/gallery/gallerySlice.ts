import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CarouselItem } from '../../components/Carousel';

interface GalleryState {
    compositions: CarouselItem[];
}

const compositions: CarouselItem[] = [
    {
        index: 0,
        title: 'La Ligne Natural',
        description: 'There is a delicate, yet assertive undertone of luxury across Alyssa Breid\'s new collection of textile works. Wanting to experiment with proportion and constraints, Breid takes her work one step farther than frame tension — experimenting with the idea of borders being larger than the actual canvas in an immaculately-rendered rebellion against the constraint of canvas size. Shapes melt over the edges, inspiring the eye and imagination to follow, and go beyond the scope of what we actually see. The new larger-scale designs have a bolder look and feel, while the miniature grids are a direct homage to Agnes Martin, a \'true minimalist pioneer.\'',
        material: 'Unmercerized cotton on canvas, natural wood frame',
        src: 'https://cdn.shopify.com/s/files/1/0941/7736/products/La-Ligne-Natural_21_25x21_25.jpg?v=1669842516',
        alt: 'La-Ligne-Natural',
        price: 2000,
        year: 2022,
        width: 21.25,
        height: 21.25
    },
    {
        index: 1,
        title: 'La Ligne Brut Noir',
        description: 'There is a delicate, yet assertive undertone of luxury across Alyssa Breid\'s new collection of textile works. Wanting to experiment with proportion and constraints, Breid takes her work one step farther than frame tension — experimenting with the idea of borders being larger than the actual canvas in an immaculately-rendered rebellion against the constraint of canvas size. Shapes melt over the edges, inspiring the eye and imagination to follow, and go beyond the scope of what we actually see. The new larger-scale designs have a bolder look and feel, while the miniature grids are a direct homage to Agnes Martin, a \'true minimalist pioneer.\'',
        material: 'Unmercerized cotton on canvas, natural wood frame',
        src: 'https://cdn.shopify.com/s/files/1/0941/7736/products/La-Ligne-Brut-Noir_21_25x21_25-Primary.jpg?v=1669841607',
        alt: 'La-Ligne-Brut-Noir',
        price: 2000,
        year: 2022,
        width: 21.25,
        height: 21.25
    },  
    {
        index: 2,
        title: 'Untitled',
        description: 'Rendered in shades of cream and black, fiber artist Alyssa Breid’s new collection of weavings on canvas feature the circle as a central shape in each work. On Weaving: Loop, pull thread, repeat was inspired by the Japanese and Scandinavian practices of wabi-sabi and hygge and features the artist’s signature weaving technique directly on canvas. Like a full moon brimming with light and a sense of calm, the woven cotton circles in Breid’s work convey a sense of satisfaction and completion—nothing, after all, is more perfect than a circle.',
        material: 'Unmercerized cotton on canvas, handmade walnut frame',
        src: 'https://cdn.shopify.com/s/files/1/0941/7736/products/Untitled-_totem_-cream__18x24-Primary.jpg?v=1640031270',
        alt: 'Untitled-_totem_-cream',
        price: 1200,
        year: 2021,
        width: 25.5,
        height: 19.5
    },
    {
        index: 3,
        title:'Untitled iv',
        description: 'Rendered in whimsical shapes, and natural colors and textures, the new series of textile works from Alyssa Breid was influenced by the lightness and hope of the coming spring season. The meticulously crafted works are designed to embody the changing of light, brightness, and sweet smell of the fresh spring breeze. In an exciting evolution of her approach, Breid plays with the idea of one shape continuing over two canvases, conveying the thesis that the barrier of the canvas no longer has to end the idea of a shape. Rather, it can bring a sense of continuity over its edge, spilling the form into a new canvas.',
        material: 'Unmercerized cotton on canvas with a natural wood frame',
        src: 'https://cdn.shopify.com/s/files/1/0941/7736/products/Untitled-iv_17x21-Primary.jpg?v=1679524180',
        alt: 'Untitled iv',
        price: 1200,
        year: 2023,
        width: 17,
        height: 21
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