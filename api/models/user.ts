import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

export interface User {
  email: string;
  first: string;
  last: string;
  isActive: boolean;
  matchPassword: (password: string) => boolean; 
}

const options = {
  timestamps: true,
}

const userSchema = new Schema<User & { password: string;  }>({
  email: { type: String, required: [true, 'Email is required'], unique: true },
  first: { type: String, required: [true, 'First name is required'] },
  last: { type: String, required: [true, 'Last name is required'] },
  password: { type: String, required: [true, 'Password is required'] },
  isActive: { type: Boolean, default: true }
}, options);

// Duplicate the ID field.
userSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
  virtuals: true
});

userSchema.method('matchPassword', async function matchPassword(enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
});

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

export const UserModel = model('User', userSchema);