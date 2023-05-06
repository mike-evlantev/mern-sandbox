import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { GalleryOrderModel as Order } from "../models/galleryOrder";

// @desc Get all orders
// @route GET /api/orders
// @access PRIVATE
export const getAll = asyncHandler(async (req: Request, res: Response) => {
    const orders = await Order.find();
    res.status(200).json(orders);
});

// @desc Get order by id
// @route GET /api/orders/:id
// @access PRIVATE
export const get = asyncHandler(async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id);  
    if (order) {
        res.status(200).json(order);
    } else {
        res.status(400);
        throw new Error('Order not found');
    }
});

// @desc Create order
// @route POST /api/orders
// @access PRIVATE
export const add = asyncHandler(async (req: Request, res: Response) => {
    //const model = {...req.body, userId: (req as AuthorizedRequest).token.id}
    const total = compositions
        .filter(c => req.body.items.some((i: number)  => c.index === i))
        .reduce((a, b) => a + b.price, 0);
    const order = await Order.create({...req.body, total});
    if (order) {
        res.status(201).json(order);
    } else {
        res.status(400);
        throw new Error('Order could not be created');
    }
});

// @desc Update order
// @route PUT /api/orders/:id
// @access PRIVATE
export const update = asyncHandler(async (req: Request, res: Response) => {
const order = await Order.findById(req.params.id);  
if (!order) {
    res.status(400);
    throw new Error('Order not found');
}

// verify owner of order
// const user = await User.findById((req as AuthorizedRequest).token.id);
// if (!user) {
//     res.status(401);
//     throw new Error('User not found');
// }

// if (order.userId.toString() !== user.id) {
//     res.status(401);
//     throw new Error('User not authorized');
// }

const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
if (updated) {
    res.status(200).json(updated);
} else {
    res.status(400);
    throw new Error('Order could not be updated');
}  
});

// @desc Remove order
// @route DELETE /api/orders/:id
// @access PRIVATE
export const remove = asyncHandler(async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id);  
    if (!order) {
        res.status(400);
        throw new Error('Order not found');
    }

    // verify owner of order
    // const user = await User.findById((req as AuthorizedRequest).token.id);
    // if (!user) {
    //     res.status(401);
    //     throw new Error('User not found');
    // }

    // if (order.userId.toString() !== user.id) {
    //     res.status(401);
    //     throw new Error('User not authorized');
    // }

    const removed = await Order.findByIdAndRemove(req.params.id);
    if (removed) {
        res.status(200).json(removed);
    } else {
        res.status(400);
        throw new Error('User could not be removed');
    }  
});

const compositions = [
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