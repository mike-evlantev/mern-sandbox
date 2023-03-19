import mongoose, { Schema } from "mongoose";

interface Order {
  email: string;
  first: string;
  last: string;
  total: number;
}

const options = {
  timestamps: true,
}

const orderSchema = new Schema<Order>({
  email: { type: String, required: [true, 'Email is required'] },
  first: { type: String, required: [true, 'First name is required'] },
  last: { type: String, required: [true, 'Last name is required'] },
  total: { type: Number, required: [true, 'Total is required'] }
}, options);

orderSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

export const OrderModel = mongoose.model('Order', orderSchema);