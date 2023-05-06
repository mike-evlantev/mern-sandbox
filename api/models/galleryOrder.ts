import mongoose, { Schema } from "mongoose";

interface GalleryOrder {
    first: string;
    last: string;
    email: string;
    phone: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string
    items: number[];
    total: number;
    paymentIntent: string | undefined;
    error: string | undefined;
}

const options = {
    timestamps: true,
}

const orderSchema = new Schema<GalleryOrder>({
    first: { type: String, required: [true, 'First name is required'] },
    last: { type: String, required: [true, 'Last name is required'] },
    email: { type: String, required: [true, 'Email is required'] },
    phone: { type: String },
    address1: { type: String, required: [true, 'Address is required'] },
    address2: { type: String },
    city: { type: String, required: [true, 'City is required'] },
    state: { type: String, required: [true, 'State is required'] },
    zip: { type: String, required: [true, 'ZIP is required'] },
    items: { type: [Number], required: [true, 'Items are required'] },
    total: { type: Number },
    paymentIntent: { type: String },
    error: { type: String }
}, options);

// Duplicate the ID field.
orderSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
orderSchema.set('toJSON', {
    virtuals: true
});

export const GalleryOrderModel = mongoose.model('GalleryOrder', orderSchema);