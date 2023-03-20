import mongoose, { Schema, Types } from "mongoose";

interface Order {
  userId: Types.ObjectId;
  email: string;
  first: string;
  last: string;
  total: number;
}

const options = {
  timestamps: true,
}

const orderSchema = new Schema<Order>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true, // must be a registered user to place an order
    ref: 'User', // reference specific model
  },
  email: { type: String, required: [true, 'Email is required'] },
  first: { type: String, required: [true, 'First name is required'] },
  last: { type: String, required: [true, 'Last name is required'] },
  total: { type: Number, required: [true, 'Total is required'] }
}, options);

// Duplicate the ID field.
orderSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
orderSchema.set('toJSON', {
  virtuals: true
});

export const OrderModel = mongoose.model('Order', orderSchema);